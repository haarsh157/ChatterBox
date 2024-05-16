"use client";

import axios from "axios";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteServer";
  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/servers/${server?.id}`);

      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteButton = isLoading ? (
    <div className="flex items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-rose-500 mr-2"></div>
      <span className=" text-rose-500">Deleting...</span>
    </div>
  ) : (
    <Button
      className="rounded-xl dark:hover:text-white dark:hover:bg-rose-500 text-rose-500"
      onClick={onClick}
    >
      Confirm
    </Button>
  );

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#313338] text-white p-0 overflow-hidden border-none drop-shadow-xl shadow-[0_8px_30px_rgb(255,255,255,0.25)]">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-400">
            Are you sure you want to Delete{" "}
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-[#1e1f22] px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              className=" dark:hover:bg-[#313338] rounded-xl"
              disabled={isLoading}
              onClick={onClose}
              variant="ghost"
            >
              Cancel
            </Button>
            {deleteButton}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
