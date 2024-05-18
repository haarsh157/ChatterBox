"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import { useModal } from "@/hooks/use-modal-store";
import { Mail, PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import { UserAvatar } from "@/components/user-avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const DATE_FORMAT = "d MMM yyyy";

interface MemberContextMenuProps {
  children: React.ReactNode;
  onMemberClick: any;
  profile: any;
}

export const MemberContextMenu = ({
  children,
  profile,
  onMemberClick
}: MemberContextMenuProps) => {
  const { onOpen } = useModal();
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className=" h-[500px] w-96 bg-[#282828] border-none rounded-xl">
        <div className="flex items-center justify-between h-full flex-col bg-[#454548] rounded-xl relative">
          <div className="h-[15%] w-full bg-purple-600 rounded-t-xl flex">
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="h-full w-[70%] z-50 flex justify-end items-center m-2 p-2 absolute top-0 right-0">
                <Button className="p-2 hover:bg-[#5f615f75] rounded-full outline-none">
                  <PencilIcon />
                </Button>
              </div>
            </div>
          </div>
          <button className="h-[90px] w-[90px] bg-[#414142] rounded-full flex justify-center items-center absolute top-[15%] left-6 transform -translate-y-1/2 z-50">
            <UserAvatar
              src={profile.imageUrl}
              className="h-[90%] w-[90%] md:h-20 md:w-20"
            />
          </button>
          <div className="h-[85%] w-full drop-shadow-xl rounded-b-xl flex justify-center items-center">
            <Card className="h-[80%] w-[90%] bg-black rounded-xl border-none">
              <CardHeader>
                <CardTitle>{profile.username}</CardTitle>
                <CardDescription>{profile.name}</CardDescription>
              </CardHeader>
              <Separator className=" bg-zinc-200 dark:bg-zinc-600 w-[95%] ml-2" />
              <CardContent>
                <div className="mt-4 font-bold">Member Since</div>
                <div>{format(new Date(profile.createdAt), DATE_FORMAT)}</div>
              </CardContent>
              <Separator className=" bg-zinc-200 dark:bg-zinc-600 w-[95%] ml-2" />
              <CardContent className="p-0 px-2">
                <Button
                  onClick={onMemberClick}
                  className="mt-2 mx-2 w-[80px] justify-start bg-indigo-500 rounded-xl hover:bg-indigo-900"
                >
                  <Mail className="w-6 mr-2" /> DM
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </ContextMenuContent>
    </ContextMenu>
  );
};
