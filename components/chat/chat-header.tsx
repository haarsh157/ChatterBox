import { Hash } from "lucide-react";
import { UserAvatar } from "../user-avatar";
import { MobileToggle } from "../mobile-toggle";
import { SocketIndicator } from "../socket-indicator";
import { ChatVideoButton } from "./chat-video-button";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
  bgImage?: string | null;
}

export const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl,
  bgImage
}: ChatHeaderProps) => {
  return (
    <>
      <div
        className={`text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 sticky ${
          bgImage !== null
            ? "dark:backdrop-brightness-50 dark:backdrop-blur"
            : "dark:bg-[#1E1F22] bg-[#E3E5E8]"
        }`}
      >
        <MobileToggle serverId={serverId} />
        {type === "channel" && (
          <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
        )}
        {type === "conversation" && (
          <UserAvatar src={imageUrl} className="h-8 w-8 md:h-8 md:w-8 mr-2" />
        )}
        <p className="font-semibold text-md text-black dark:text-white">
          {name}
        </p>
        <div className="ml-auto flex items-center">
          {type === "conversation" && <ChatVideoButton />}
          <SocketIndicator />
        </div>
      </div>
    </>
  );
};
