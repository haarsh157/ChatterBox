"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "username is required."
  })
});

type FormData = z.infer<typeof formSchema>;

export const ChangeUserName = () => {
    const { onClose, isOpen } = useModal();
    const [isMounted, setIsMounted] = useState(false);
    const isModalOpen = isOpen;
  
    const router = useRouter();
  
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    const form = useForm<FormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: ""
      }
    });
  
    const isLoading = form.formState.isSubmitting;
  
    const onSubmit: SubmitHandler<FormData> = async (values) => {
      try {
        await axios.patch("/api/profile", values);
  
        form.reset();
        router.refresh();
        onClose();
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };
  
    if (!isMounted) {
      return null;
    }
  
    const saveButton = isLoading ? (
      <div className="flex items-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2  mr-2"></div>
        <span>Editing...</span>
      </div>
    ) : (
      <Button className=" rounded-xl" variant="primary" disabled={isLoading}>
        Save
      </Button>
    );

  return (
    <DialogContent className="bg-[#313338] text-white p-0 overflow-hidden border-none drop-shadow-xl shadow-[0_8px_30px_rgb(255,255,255,0.25)]">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Enter your desired Username
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-400">
            Tell us what people should call you
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-[#1e1f22] border-0 focus-visible:ring-0 text-white focus-visible:ring-offset-0 rounded-xl"
                        placeholder="Enter username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-[#1e1f22] px-6 py-4">
              {saveButton}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
  );
};
