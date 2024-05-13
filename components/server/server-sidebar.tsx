import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { ServerSearch } from "./server-serarch";
import { Hash, Mic, ShieldCheck, Video } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";
import { ProfileSettings } from "./profile-settings";

interface ServerSidebarProps {
  serverId: string;
}

const roleiconMap = {
  [MemberRole.ADMIN]: <ShieldCheck className=" h-4 w-4 mr-2 text-rose-500" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className=" h-4 w-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.GUEST]: null,
};

const channelIconMap = {
  [ChannelType.TEXT]: <Hash className=" mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className=" mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className=" mr-2 h-4 w-4" />,
};

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channel: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannels = server?.channel.filter(
    (ch) => ch.type === ChannelType.TEXT
  );
  const audioChannels = server?.channel.filter(
    (ch) => ch.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channel.filter(
    (ch) => ch.type === ChannelType.VIDEO
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  if (!server) {
    return redirect("/servers");
  }
  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className={`flex flex-col h-full text-primary w-full  ${profile.bgImage!==null ? "dark:backdrop-brightness-90 dark:backdrop-blur":"dark:bg-[#2B2D31] bg-[#F2F3F5] drop-shadow-xl shadow-[0_8px_30px_rgb(255,255,255,0.25)]"}  border-r-[1px] border-[#363739]`}>
      <ServerHeader server={server} role={role} />
      <ScrollArea className=" flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((ch) => ({
                  id: ch.id,
                  name: ch.name,
                  icon: channelIconMap[ch.type],
                })),
              },
              {
                label: "Audio Channels",
                type: "channel",
                data: audioChannels?.map((ch) => ({
                  id: ch.id,
                  name: ch.name,
                  icon: channelIconMap[ch.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((ch) => ({
                  id: ch.id,
                  name: ch.name,
                  icon: channelIconMap[ch.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleiconMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className=" bg-zinc-200 dark:bg-zinc-600" />
        {!!textChannels?.length && (
          <>
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
              server={server}
            />
            <div className="space-y-[2px]">
              {textChannels.map((ch) => (
                <ServerChannel
                  key={ch.id}
                  channels={ch}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </>
        )}
        {!!audioChannels?.length && (
          <>
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Audio Channels"
              server={server}
            />
            <div className="space-y-[2px]">
              {audioChannels.map((ch) => (
                <ServerChannel
                  key={ch.id}
                  channels={ch}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </>
        )}
        {!!videoChannels?.length && (
          <>
            <div className="mb-2">
              <ServerSection
                sectionType="channels"
                channelType={ChannelType.VIDEO}
                role={role}
                label="Video Channels"
                server={server}
              />
              <div className="space-y-[2px]">
                {videoChannels.map((ch) => (
                  <ServerChannel
                    key={ch.id}
                    channels={ch}
                    role={role}
                    server={server}
                  />
                ))}
              </div>
            </div>
          </>
        )}
        {!!members?.length && (
          <>
            <div className="mb-2">
              <ServerSection
                sectionType="members"
                role={role}
                label="Members"
                server={server}
              />
              <div className="space-y-[2px]">
                {members.map((member) => (
                  <ServerMember
                    key={member.id}
                    member={member}
                    server={server}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </ScrollArea>
      <Separator className=" bg-zinc-200 dark:bg-zinc-600" />{" "}
      <ProfileSettings profile={profile} />
    </div>
  );
};
