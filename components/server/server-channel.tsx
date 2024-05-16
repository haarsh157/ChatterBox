"use client";

import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Mic, Trash, Video, Lock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ActionTooltip from "../action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import { ChannelContextMenu } from "./channel-context-menu";

interface ServerChannelProps {
  channels: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video
};

export const ServerChannel = ({
  channels,
  server,
  role
}: ServerChannelProps) => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[channels.type];

  const onclick = () => {
    router.push(`/servers/${params?.serverId}/channels/${channels.id}`);
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { channels, server });
  };

  return (
    <>
      <ChannelContextMenu channelName={channels.name} role={role} channels={channels} server={server}>
        <button
          onClick={onclick}
          className={cn(
            "group px-2 py-2 rounded-xl flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
            params?.channelId === channels.id &&
              "bg-zinc-700/20 dark:bg-zinc-700"
          )}
        >
          <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
          <p
            className={cn(
              "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
              params?.channelId === channels.id &&
                "text-primary dark:text-zinc-200 dark:group-hover:text-white"
            )}
          >
            {channels.name}
          </p>
          {channels.name !== "general" && role !== MemberRole.GUEST && (
            <div className="ml-auto flex items-center gap-x-2">
              <ActionTooltip label="Edit">
                <Edit
                  onClick={(e) => onAction(e, "editChannel")}
                  className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-500 transition"
                />
              </ActionTooltip>

              <ActionTooltip label="Delete">
                <Trash
                  onClick={(e) => onAction(e, "deleteChannel")}
                  className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-rose-500 dark:text-zinc-400 dark:hover:text-rose-500 transition"
                />
              </ActionTooltip>
            </div>
          )}
          {channels.name === "general" && (
            <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          )}
        </button>
      </ChannelContextMenu>
    </>
  );
};
