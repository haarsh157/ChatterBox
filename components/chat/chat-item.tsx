"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { Edit, FileIcon, ShieldCheck, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { UserAvatar } from "@/components/user-avatar";
import ActionTooltip from "@/components/action-tooltip";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { ChatContextMenu } from "./chat-context-menu";
import { Popover, PopoverTrigger } from "../ui/popover";
import { MemberProfile } from "../modals/member-profile";

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  server: Server & {
    members: (Member & { profile: Profile })[];
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member & {
    profile: Profile;
  };
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const roleIconMap: Record<MemberRole, JSX.Element | null> = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldCheck className="h-4 w-4 ml-2 text-rose-500" />
};

const formSchema = z.object({
  content: z.string().min(1)
});

export const ChatItem = ({
  id,
  content,
  member,
  server,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const onMemberClick = () => {
    if (member.id === currentMember.id) {
      return;
    }
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery
      });

      await axios.patch(url, values);

      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    form.reset({
      content: content
    });
  }, [content, form]);

  const fileType = fileUrl?.split(".").pop();

  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;

  const extractMentions = (content: string) => {
    const mentionRegex = /@(\w+)/g;
    const mentions = [];
    let match;
    while ((match = mentionRegex.exec(content)) !== null) {
      mentions.push({
        mention: match[0],
        index: match.index,
        length: match[0].length
      });
    }
    return mentions;
  };
  const mentions = extractMentions(content);

  const renderContentWithMentions = (
    content: string,
    mentions: { mention: string; index: number; length: number }[]
  ) => {
    const parts = [];
    let lastIndex = 0;

    mentions.forEach(({ mention, index, length }) => {
      if (lastIndex < index) {
        parts.push(content.slice(lastIndex, index));
      }

      const username = mention.slice(1);
      const member = server.members.find(
        (m) => m.profile.username === username
      );
      const pro = member?.profile;

      parts.push(
        <Popover>
          <PopoverTrigger
            key={index}
            className="bg-[#2189ea92] text-white font-bold p-1/5 rounded-md m-1 cursor-pointer"
          >
            {mention}
          </PopoverTrigger>
          <MemberProfile profile={pro} onMemberClick={onMemberClick} />
        </Popover>
      );
      lastIndex = index + length;
    });

    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts;
  };

  const isCurrentUserMentioned = mentions.some(
    (mention) => mention.mention.slice(1) === currentMember.profile.username
  );
  console.log(isCurrentUserMentioned);

  return (
    <ChatContextMenu
      canDeleteMessage={canDeleteMessage}
      canEditMessage={canEditMessage}
      setIsEditing={setIsEditing}
      socketUrl={socketUrl}
      id={id}
      socketQuery={socketQuery}
    >
      <div
        className={cn(
          "relative group flex items-center p-4 transition w-full",
          isCurrentUserMentioned ? "bg-[#473b607d]" : "hover:bg-[#2b2d316f]"
        )}
      >
        <div className="group flex gap-x-2 items-start w-full">
          <Popover>
            <PopoverTrigger className="cursor-pointer transition">
              <UserAvatar src={member.profile.imageUrl} />
            </PopoverTrigger>
            <MemberProfile
              profile={member.profile}
              onMemberClick={onMemberClick}
            />
          </Popover>
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-x-2">
              <div className="flex items-center">
                <p
                  onClick={onMemberClick}
                  className="font-semibold text-sm hover:underline cursor-pointer"
                >
                  {member.profile.username}
                </p>
                <ActionTooltip label={member.role}>
                  {roleIconMap[member.role]}
                </ActionTooltip>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {timestamp}
              </span>
            </div>
            {isImage && (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48 border-none"
              >
                <Image
                  src={fileUrl}
                  alt={content}
                  fill
                  className="object-cover"
                />
              </a>
            )}
            {isPDF && (
              <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                  PDF File
                </a>
              </div>
            )}
            {!isEditing && (
              <p
                className={cn(
                  "text-sm text-zinc-600 dark:text-zinc-300",
                  deleted &&
                    "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
                )}
              >
                {content === fileUrl
                  ? null
                  : renderContentWithMentions(content, mentions)}
                {isUpdated && !deleted && (
                  <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                    (edited)
                  </span>
                )}
              </p>
            )}
            {isEditing && (
              <Form {...form}>
                <form
                  className="flex items-center w-full gap-x-2 pt-2"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="relative w-full">
                            <Input
                              disabled={isLoading}
                              className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                              placeholder="Edited message"
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button disabled={isLoading} size="sm" variant="primary">
                    Save
                  </Button>
                </form>
                <span className="text-[10px] mt-1 text-zinc-400">
                  Press escape to cancel, enter to save
                </span>
              </Form>
            )}
          </div>
        </div>
        {canDeleteMessage && (
          <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
            {canEditMessage && (
              <ActionTooltip label="Edit">
                <Edit
                  onClick={() => setIsEditing(true)}
                  className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                />
              </ActionTooltip>
            )}
            <ActionTooltip label="Delete">
              <Trash
                onClick={() =>
                  onOpen("deleteMessage", {
                    apiUrl: `${socketUrl}/${id}`,
                    query: socketQuery
                  })
                }
                className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              />
            </ActionTooltip>
          </div>
        )}
      </div>
    </ChatContextMenu>
  );
};
