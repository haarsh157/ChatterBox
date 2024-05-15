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
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const LogOut = () => {
  const { onClose } = useModal();
  const router = useRouter();

  const { signOut } = useClerk();
  const [isSigningOut, setIsSigningOut] = useState(false);

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

  const signOutButton = isSigningOut ? (
    <div className="flex items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-rose-500 mr-2"></div>
      <span className=" text-rose-500">Signing Out...</span>
    </div>
  ) : (
    <Button
      className="rounded-xl dark:hover:text-white dark:hover:bg-rose-500 text-rose-500"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );

  return (
    <DialogContent className="bg-[#313338] text-white p-0 overflow-hidden border-none drop-shadow-xl shadow-[0_8px_30px_rgb(255,255,255,0.25)]">
      <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-bold">
          Log-Out
        </DialogTitle>
        <DialogDescription className="text-center text-zinc-400 text-md">
          Are you sure you want to Log-Out??
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="bg-[#1e1f22] px-6 py-4">
        {signOutButton}
      </DialogFooter>
    </DialogContent>
  );
};
