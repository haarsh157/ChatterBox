"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import { useModal } from "@/hooks/use-modal-store";
import { Edit, Reply, Trash } from "lucide-react";

interface ChatContextMenuProps {
  children: React.ReactNode;
  canEditMessage: boolean;
  canDeleteMessage: boolean;
  setIsEditing: any;
  socketUrl: string;
  id: string;
  socketQuery: Record<string, string>;
  handleReplyClick: any;
}

export const ChatContextMenu = ({
  children,
  canDeleteMessage,
  canEditMessage,
  setIsEditing,
  socketUrl,
  id,
  socketQuery,
  handleReplyClick
}: ChatContextMenuProps) => {
  const { onOpen } = useModal();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64 border-none bg-black">
        <ContextMenuItem inset onClick={handleReplyClick}>
          Reply
          <Reply className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
        </ContextMenuItem>
        {canEditMessage && (
          <ContextMenuItem inset onClick={() => setIsEditing(true)}>
            <p>Edit Message</p>
            <Edit className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
          </ContextMenuItem>
        )}
        {canDeleteMessage && (
          <ContextMenuItem
            inset
            onClick={() =>
              onOpen("deleteMessage", {
                apiUrl: `${socketUrl}/${id}`,
                query: socketQuery
              })
            }
          >
            <p>Delete Message</p>
            <Trash className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};
