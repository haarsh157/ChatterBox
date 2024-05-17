"use client";

import { useModal } from "@/hooks/use-modal-store";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ChangeTheme } from "./profile-settings/change-theme";
import { LogOut } from "./profile-settings/log-out";
import { DeleteProfile } from "./profile-settings/delete-profile";
import { ChangePfp } from "./profile-settings/change-pfp";
import { ChangeUserName } from "./profile-settings/change-username";
import { Separator } from "@/components/ui/separator";

export const ProfileSettingsModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "profileSettings";
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#313338] text-white p-4 overflow-hidden border-none drop-shadow-xl shadow-[0_8px_30px_rgb(255,255,255,0.25)] w-full h ">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Profile Settings
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-400">
            Customize your Profile
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col justify-center items-center">
          {/* Change Username */}
          <Dialog>
            <DialogTrigger
              className="w-[100%] flex justify-center items-center"
              asChild
            >
              <Button className="group px-2 py-2 rounded-xl flex items-center gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1 w-[50%]">
                Change Username
              </Button>
            </DialogTrigger>
            <ChangeUserName />
          </Dialog>
          {/* Change Theme */}
          <Dialog>
            <DialogTrigger
              className="w-[100%] flex justify-center items-center"
              asChild
            >
              <Button className="group px-2 py-2 rounded-xl flex items-center gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1 w-[50%]">
                Change The Theme
              </Button>
            </DialogTrigger>
            <ChangeTheme />
          </Dialog>

          {/* Change pfp */}
          <Dialog>
            <DialogTrigger
              className="w-[100%] flex justify-center items-center"
              asChild
            >
              <Button className="group px-2 py-2 rounded-xl flex items-center gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1 w-[50%]">
                Change Your PFP
              </Button>
            </DialogTrigger>
            <ChangePfp />
          </Dialog>

          <Separator className=" bg-zinc-200 dark:bg-zinc-600 m-2" />

          {/* Log Out */}
          <Dialog>
            <DialogTrigger
              className="w-[100%] flex justify-center items-center"
              asChild
            >
              <Button className="group px-2 py-2 rounded-xl flex items-center gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1 w-[50%] text-rose-500 dark:hover:bg-rose-500 dark:hover:text-white">
                Log-Out
              </Button>
            </DialogTrigger>
            <LogOut />
          </Dialog>

          {/* Delete Profile */}
          <Dialog>
            <DialogTrigger
              className="w-[100%] flex justify-center items-center"
              asChild
            >
              <Button className="group px-2 py-2 rounded-xl flex items-center gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1 w-[50%] text-rose-500 dark:hover:bg-rose-500 dark:hover:text-white">
                Delete Your Account
              </Button>
            </DialogTrigger>
            <DeleteProfile />
          </Dialog>
        </div>
      </DialogContent>
    </Dialog>
  );
};
