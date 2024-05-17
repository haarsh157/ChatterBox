"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useClerk } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const DeleteProfile = () => {
  const { onClose } = useModal();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      router.push("/");
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleDelete = async () => {
    try {
      router.push("/");
      await axios.delete(`/api/profile`);
      await handleSignOut();
      onClose();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteButton = isSigningOut ? (
    <div className="flex items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-rose-500 mr-2"></div>
      <span className=" text-rose-500">Deleting...</span>
    </div>
  ) : (
    <Button
      className="rounded-xl dark:hover:text-white dark:hover:bg-rose-500 text-rose-500"
      onClick={handleDelete}
    >
      Delete Account
    </Button>
  );

  return (
    <DialogContent className="bg-[#313338] text-white p-0 overflow-hidden border-none drop-shadow-xl shadow-[0_8px_30px_rgb(255,255,255,0.25)]">
      <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-bold">
          Wanna delete this Account??
        </DialogTitle>
        <DialogDescription className="text-center text-zinc-400 text-md">
          Until we meet again, take care and stay well!
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="bg-[#1e1f22] px-6 py-4">
        {deleteButton}
      </DialogFooter>
    </DialogContent>
  );
};
