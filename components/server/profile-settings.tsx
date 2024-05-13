"use client";

import { useModal } from "@/hooks/use-modal-store";
import ActionTooltip from "../action-tooltip";
import Image from "next/image";

interface ProfileSettingsProps {
  profile: any;
}

export const ProfileSettings = ({ profile }: ProfileSettingsProps) => {
  const { onOpen } = useModal();

  return (
    <ActionTooltip label="Profile Settings" side="right">
      <button
        onClick={() => onOpen("profileSettings", { profile })}
        className=" h-[60px] flex items-center dark:hover:bg-[#454548] dark:hover:text-gray-200 z-50"
      >
        <Image
          src={profile.imageUrl}
          alt={"image"}
          height={40}
          width={40}
          className="ml-2 rounded-full"
        />
        <div className="pl-4 cursor-pointer  h-full w-full flex justify-center  flex-col">
          <p className=" text-xs text-gray-300 font-semibold flex items-center gap-x-1">
            {profile.name}
          </p>
          <p className=" text-xs text-gray-300 font-medium flex items-center gap-x-1">
            {profile.email}
          </p>
        </div>
      </button>
    </ActionTooltip>
  );
};
