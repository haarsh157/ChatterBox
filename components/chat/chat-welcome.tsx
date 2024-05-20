import { Hash } from "lucide-react";
import { UserAvatar } from "../user-avatar";

interface ChatWelcomeProps {
  name: string;
  type: "channel" | "conversation";
  imageUrl: string;
  username: string;
}

export const ChatWelcome = ({
  type,
  name,
  imageUrl,
  username
}: ChatWelcomeProps) => {
  return (
    <>
      <div className="space-y-2 px-4 mb-4">
        {type === "channel" ? (
          <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
            <Hash className="h-12 w-12 text-white" />
          </div>
        ) : (
          <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
            <UserAvatar src={imageUrl} className="h-12 w-12" />
          </div>
        )}
        <p className="text-xl md:text-3xl font-bold">
          {type === "channel" ? `Welcome to #${name}` : username}
        </p>
        <p>
          {type === "conversation"
            ? `This is the start of your conversation with ${username}`
            : `This is the start of the channel #${name}`}
        </p>
      </div>
    </>
  );
};
