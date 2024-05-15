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
import { ChangeBgImg } from "./profile-settings/change-bgImg";
import { LogOut } from "./profile-settings/log-out";
import { DeleteProfile } from "./profile-settings/delete-profile";
import { ChangePfp } from "./profile-settings/change-pfp";

const formSchema = z.object({
  bgImage: z.string()
});

export const ProfileSettingsModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "profileSettings";
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#313338] text-white p-0 overflow-hidden border-none drop-shadow-xl shadow-[0_8px_30px_rgb(255,255,255,0.25)]">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Profile Settings
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-400">
            Customize your Profile
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col justify-center items-center">
          <Dialog>
            <DialogTrigger
              className="w-[100%] flex justify-center items-center"
              asChild
            >
              <Button className="group px-2 py-2 rounded-xl flex items-center gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1 w-[50%]">
                Change The Background
              </Button>
            </DialogTrigger>
            <ChangeBgImg />
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
            <ChangePfp/>
          </Dialog>

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
