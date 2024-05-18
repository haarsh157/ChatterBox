"use client";

import { useModal } from "@/hooks/use-modal-store";
import ActionTooltip from "../action-tooltip";
import { PencilIcon, Settings } from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";
import { format } from "date-fns";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ProfileSettingsProps {
  profile: any;
}

const DATE_FORMAT = "d MMM yyyy";

export const ProfileSettings = ({ profile }: ProfileSettingsProps) => {
  const { onOpen } = useModal();

  return (
    <ActionTooltip label="Profile Settings" side="right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className=" outline-none">
          <button className=" h-[60px] flex items-center dark:hover:bg-[#454548] dark:hover:text-gray-200 z-50">
            <UserAvatar
              src={profile.imageUrl}
              className="h-8 w-8 md:h-8 md:w-8 ml-4"
            />
            <div className="pl-4 cursor-pointer  h-full w-full flex justify-center  flex-col">
              <p className=" text-xs text-gray-300 font-semibold flex items-center gap-x-1">
                {profile.username}
              </p>
              <p className=" text-xs text-gray-300 font-medium flex items-center gap-x-1">
                {profile.name}
              </p>
            </div>
            <Settings className="mr-2 h-6 w-6" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="h-[500px] w-[400px] bg-[#414142] border-none rounded-xl p-2"
          sideOffset={-40}
        >
          <div className="flex items-center justify-between h-full flex-col bg-[#454548] rounded-xl relative">
            <div className="h-[15%] w-full bg-purple-600 rounded-t-xl flex">
              <div className="w-full h-full flex items-center justify-center relative">
                <div className="h-full w-[70%] z-50 flex justify-end items-center m-2 p-2 absolute top-0 right-0">
                  <Button
                    onClick={() => onOpen("profileSettings", { profile })}
                    className="p-2 hover:bg-[#5f615f75] rounded-full"
                  >
                    <PencilIcon />
                  </Button>
                </div>
              </div>
            </div>
            <button
              className="h-[90px] w-[90px] bg-[#414142] rounded-full flex justify-center items-center absolute top-[15%] left-6 transform -translate-y-1/2 z-50"
              onClick={() => onOpen("profileSettings", { profile })}
            >
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
                <CardContent className="p-2">
                  <Popover>
                    <Button className=" w-full justify-start hover:bg-[#414142]">
                      <PopoverTrigger className=" flex justify-between items-center w-full">
                        <Button className="flex items-center justify-start hover:bg-[#414142] w-full p-1 rounded-xl">
                          <div className="h-2 w-2 bg-emerald-500 rounded-full ml-4  "></div>
                          <div className="px-4">Online</div>
                        </Button>
                        {/* <ChevronRight className=" right-8 absolute" /> */}
                      </PopoverTrigger>
                      {/* <PopoverContent
                        className="border-none  bg-[#282828] rounded-xl p-2"
                        side="right"
                        >
                        <Button className="flex items-center justify-start hover:bg-[#414142] w-full p-1 rounded-xl">
                        <div className="h-2 w-2 bg-emerald-500 rounded-full ml-4  "></div>
                        <div className="px-4">Online</div>
                        </Button>
                        <div className=" flex justify-start items-center w-full">
                        <Moon className="m-2 text-yellow-300 fill-yellow-300" />
                        Idle
                        </div>
                        <Separator className=" bg-zinc-200 dark:bg-zinc-600 w-[95%] ml-2" />
                      </PopoverContent> */}
                    </Button>
                  </Popover>
                </CardContent>
                <Separator className=" bg-zinc-200 dark:bg-zinc-600 w-[95%] ml-2" />
                <CardContent className="p-2">
                  <Button
                    onClick={() => onOpen("profileSettings", { profile })}
                    className="w-full justify-between hover:bg-[#414142] text-md"
                  >
                    Profile Settings
                    <Settings className="" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </ActionTooltip>
  );
};
