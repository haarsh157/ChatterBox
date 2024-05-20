"use client";

import { useRef, Fragment, ElementRef, useState } from "react";
import { format } from "date-fns";
import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { Loader2, ServerCrash } from "lucide-react";
import { ChatWelcome } from "./chat-welcome";
import { ChatItem } from "./chat-item";
import { Member, Message, Profile } from "@prisma/client";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

interface ChatMessagesProps {
  name: string;
  member: any;
  server: any;
  chatId: string;
  username: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
  imageUrl: string;
}

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

export const ChatMessages = ({
  name,
  member,
  server,
  chatId,
  apiUrl,
  socketQuery,
  socketUrl,
  paramKey,
  paramValue,
  type,
  imageUrl,
  username
}: ChatMessagesProps) => {
  const queryKey = [`chat:${chatId}`];
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const chatRef = useRef<HTMLDivElement | ElementRef<"div">>(null);
  const bottomRef = useRef<HTMLDivElement | ElementRef<"div">>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue
    });

  useChatSocket({ queryKey, addKey, updateKey });

  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0
  });

  const [replyTo, setReplyTo] = useState("");

  const handleReply = (id: string) => {
    setReplyTo(id);
  };

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto" ref={chatRef}>
      <div className="flex-1" />
      <ChatWelcome
        type={type}
        name={name}
        username={username}
        imageUrl={imageUrl}
      />
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                id={message.id}
                currentMember={member}
                member={message.member}
                server={server}
                content={message.content}
                repliedTo={message.replyTo}
                fileUrl={message.fileUrl}
                deleted={message.deleted}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                isUpdated={message.updatedAt !== message.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
                replyTo={handleReply}
                replyContent={message.replyContent}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef}></div>
    </div>
  );
};
