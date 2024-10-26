"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Server, Profile } from "@prisma/client";
import { ShieldCheck } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { UserAvatar } from "../user-avatar";
import { MemberContextMenu } from "./member-context-menu";
import { profile } from "console";
import { Popover, PopoverTrigger } from "../ui/popover";
import { MemberProfile } from "../modals/member-profile";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
  profile: Profile;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.ADMIN]: <ShieldCheck className="h-4 w-4 ml-2 text-rose-500" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
  )
};

export const ServerMember = ({ member, profile }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  return (
    <>
      <MemberContextMenu profile={member.profile} onMemberClick={onClick}>
        <Popover>
          <PopoverTrigger className=" w-full">
            <button
              className={cn(
                "group px-2 py-2 rounded-xl flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
                params?.memberId === member.id &&
                  "bg-zinc-700/20 dark:bg-zinc-700"
              )}
            >
              <UserAvatar
                src={member.profile.imageUrl}
                className="h-5 w-5 md:h-8 md:w-8"
              />
              <p
                className={cn(
                  "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
                  params?.memberId === member.id &&
                    "text-primary dark:text-zinc-200 dark:group-hover:text-white"
                )}
              >
                {member.profile.username}
              </p>
              {icon}
            </button>
          </PopoverTrigger>
          <MemberProfile
            profile={member}
            onMemberClick={() => {
              router.push(
                `/servers/${params?.serverId}/conversations/${member?.id}`
              );
            }}
          />
        </Popover>
      </MemberContextMenu>
    </>
  );
};
