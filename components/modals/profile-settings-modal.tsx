"use client";

import { useModal } from "@/hooks/use-modal-store";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useClerk } from "@clerk/clerk-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FileUpload } from "../file-upload";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChangeBgImg } from "./profile-settings/change-bgImg";
import { LogOut } from "./profile-settings/log-out";
import { DeleteProfile } from "./profile-settings/delete-profile";
import { ChangePfp } from "./profile-settings/change-pfp";

const formSchema = z.object({
  bgImage: z.string()
});

export const ProfileSettingsModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const { profile } = data;

  const isModalOpen = isOpen && type === "profileSettings";
  const handleClose = () => {
    onClose();
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bgImage: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/profile/`, values);
      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
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
