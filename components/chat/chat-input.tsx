"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "@/components/emoji-picker";
import { useCallback, useEffect, useState } from "react";
import { useMessageId } from "../provider/context-provider";
import { cn } from "@/lib/utils";
import { Member, Message, Profile } from "@prisma/client";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
  replyTo: z.string().optional(),
  replyContent: z.string().optional()
});

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const { messageId } = useMessageId();

  useEffect(() => {
    if (messageId) {
      console.log("Current Message ID: ", messageId);
    }
  }, [messageId]);

  const { onOpen, data } = useModal();
  const router = useRouter();
  const params = useParams();
  const [replyToMessage, setReplyToMessage] = useState<
    | (Message & {
        member: Member & { profile: Profile };
      })
    | null
  >(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      replyTo: "",
      replyContent: ""
    }
  });

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/messages/?channelId=${params?.channelId}`
      );

      const replyTo = await response.data.items.find(
        (message: { id: string }) => message.id === messageId
      );
      if (replyTo) {
        setReplyToMessage(replyTo);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [messageId, params?.channelId]);

  useEffect(() => {
    if (messageId) {
      fetchMessages();
    }
  }, [messageId, fetchMessages]);

  const { setMessageId } = useMessageId();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const replyto = replyToMessage?.member.profile.id;
      values.replyTo = replyto;
      values.replyContent = replyToMessage?.content;

      const url = qs.stringifyUrl({
        url: apiUrl,
        query
      });
      await axios.post(url, values);

      form.reset();
      router.refresh();
      setMessageId(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="md:relative p-4 pb-6 bottom-0 sticky">
                  <div
                    className={cn(
                      "h-10 w-full flex justify-start items-center px-6 bg-[#807a7a96] text-sm italic text-zinc-500 dark:text-zinc-400 mt-1 ease-in-out",
                      {
                        hidden: !messageId
                      }
                    )}
                  >
                    <span className="font-bold">
                      Replying To{" "}
                      <span className=" text-indigo-500">
                        {replyToMessage?.member.profile.username}
                      </span>{" "}
                      :{" "}
                    </span>
                    {replyToMessage?.content}
                    {replyToMessage?.updatedAt !== replyToMessage?.createdAt &&
                      !replyToMessage?.deleted && (
                        <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                          (edited)
                        </span>
                      )}
                    <X
                      onClick={() => {
                        setMessageId(null);
                      }}
                      className="right-8 absolute cursor-pointer"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpen("messageFile", { apiUrl, query })}
                    className="absolute bottom-[36px] left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
                  <Input
                    disabled={isLoading}
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder={`Message ${
                      type === "conversation" ? name : "#" + name
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.shiftKey) {
                        e.preventDefault();
                      }
                    }}
                    {...field}
                  />
                  <div className="absolute bottom-[30px] right-8">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
