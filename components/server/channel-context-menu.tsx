"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import { Channel, MemberRole, Server } from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";

interface ChannelContextMenuProps {
  children: React.ReactNode;
  channelName: string;
  role?: MemberRole;
  channels: Channel;
  server: Server;
}

export const ChannelContextMenu = ({
  children,
  channelName,
  role,
  channels,
  server
}: ChannelContextMenuProps) => {
  const { onOpen } = useModal();

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { channels, server });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64 border-none bg-black">
        {channelName !== "general" && role !== MemberRole.GUEST && (
          <>
            <ContextMenuItem inset onClick={(e) => onAction(e, "editChannel")} className="flex justify-between items-center">
              <p>Edit Channel</p>
              <Edit className="group-hover:block w-4 h-4 text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-500 transition" />
            </ContextMenuItem>
            <ContextMenuItem
              inset
              onClick={(e) => onAction(e, "deleteChannel")} className="flex justify-between items-center"
            >
              <p>Delete Channel</p>
              <Trash className="group-hover:block w-4 h-4 text-zinc-500 hover:text-rose-500 dark:text-zinc-400 dark:hover:text-rose-500 transition" />
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};
