"use client";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  bgImage: z.string()
});

export const ChangeBgImg = () => {
  const { onClose } = useModal();
  const router = useRouter();

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
      <DialogContent className="bg-[#313338] text-white p-0 overflow-hidden border-none drop-shadow-xl shadow-[0_8px_30px_rgb(255,255,255,0.25)]">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Change The Background
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-400">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
  );
};
