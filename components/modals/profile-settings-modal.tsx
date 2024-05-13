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
  DialogTrigger,
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

const formSchema = z.object({
  bgImage: z.string(),
});

export const ProfileSettingsModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const { signOut } = useClerk();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { profile } = data;

  const isModalOpen = isOpen && type === "profileSettings";
  const handleClose = () => {
    onClose();
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bgImage: "",
    },
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
      // await handleSignOut();
      // await axios.delete(`/api/profile`);
      // router.push("/");
      // router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
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
            <DialogContent className="bg-[#313338] text-white p-0 overflow-hidden border-none drop-shadow-xl shadow-[0_8px_30px_rgb(255,255,255,0.25)]">
              <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl text-center font-bold">
                  Change The Background
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-400">
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="space-y-8 px-6">
                    <div className="flex items-center justify-center text-center">
                      <FormField
                        control={form.control}
                        name="bgImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                              Select an Image for your ChatterBox UI
                            </FormLabel>
                            <FormControl>
                              <FileUpload
                                endpoint="bgImage"
                                value={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <DialogFooter className="bg-[#1e1f22] px-6 py-4">
                    <Button
                      className=" rounded-xl"
                      variant="primary"
                      disabled={isLoading}
                    >
                      Save
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
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
          </Dialog>
        </div>
      </DialogContent>
    </Dialog>
  );
};
