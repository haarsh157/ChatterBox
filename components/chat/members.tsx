import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ScrollArea } from "../ui/scroll-area";
import { ServerSearch } from "@/components/server/server-serarch";
import { ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ServerSection } from "@/components/server/server-section";
import { ServerMember } from "@/components/server/server-member";

interface MembersProps {
  serverId: string;
}

const roleIconMap = {
  [MemberRole.ADMIN]: <ShieldCheck className=" h-4 w-4 mr-2 text-rose-500" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className=" h-4 w-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.GUEST]: null
};

export const Members = async ({ serverId }: MembersProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId
    },
    include: {
      members: {
        include: {
          profile: true
        },
        orderBy: {
          role: "asc"
        }
      }
    }
  });

  if (!server) {
    return redirect("/servers");
  }

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  const members = server.members;

  const admins = members.filter((member) => member.role === MemberRole.ADMIN);
  const moderators = members.filter(
    (member) => member.role === MemberRole.MODERATOR
  );
  const guests = members.filter((member) => member.role === MemberRole.GUEST);

  return (
    <div
      className={`flex flex-col h-full text-primary w-full  ${
        profile.bgImage !== null
          ? "dark:backdrop-brightness-90 dark:backdrop-blur"
          : "dark:bg-[#2B2D31] bg-[#F2F3F5] drop-shadow-xl shadow-[0_8px_30px_rgb(255,255,255,0.25)]"
      }  border-r-[1px] border-[#363739] rounded-xl`}
    >
      <ScrollArea className=" flex-1 px-3">
        {!!members?.length && (
          <>
            {admins.length > 0 && (
              <div className="mb-2">
                <ServerSection
                  sectionType="members"
                  role={role}
                  label="Admins"
                  server={server}
                />
                <div className="space-y-[2px]">
                  {admins.map((member) => (
                    <ServerMember
                      key={member.id}
                      member={member}
                      server={server}
                      profile={profile}
                    />
                  ))}
                </div>
              </div>
            )}

            {moderators.length > 0 && (
              <div className="mb-2">
                <ServerSection
                  sectionType="members"
                  role={role}
                  label="Moderators"
                  server={server}
                />
                <div className="space-y-[2px]">
                  {moderators.map((member) => (
                    <ServerMember
                      key={member.id}
                      member={member}
                      server={server}
                      profile={profile}
                    />
                  ))}
                </div>
              </div>
            )}

            {guests.length > 0 && (
              <div className="mb-2">
                <ServerSection
                  sectionType="members"
                  role={role}
                  label="Guests"
                  server={server}
                />
                <div className="space-y-[2px]">
                  {guests.map((member) => (
                    <ServerMember
                      key={member.id}
                      member={member}
                      server={server}
                      profile={profile}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </ScrollArea>
    </div>
  );
};
