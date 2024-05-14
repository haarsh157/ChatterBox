"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";

interface ProfileSettingsProps {
  profile: any;
}

const InitialServer = ({ profile }: ProfileSettingsProps) => {
  const { onOpen } = useModal();

  return (
    <button
      onClick={() => onOpen("createServer")}
      className="group flex items-center"
    >
      <div className="flex mx-3 h-[48px] p-5 rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
        <p className="group-hover:text-white transition text-emerald-500 p-2">
          Create New Server
        </p>
        <Plus
          className="group-hover:text-white transition text-emerald-500"
          size={25}
        />
      </div>
    </button>
  );
};

export default InitialServer;
