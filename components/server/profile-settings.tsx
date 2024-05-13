"use client";

import { useModal } from "@/hooks/use-modal-store";
import { UserButton } from "@clerk/nextjs";
import ActionTooltip from "../action-tooltip";

interface ProfileSettingsProps {
  profile: any;
}

export const ProfileSettings = ({ profile }: ProfileSettingsProps) => {
  const { onOpen } = useModal();

  return (
    <ActionTooltip label="Profile Settings" side="right">
      <div className="w-full bg-[#18181a] h-[60px] flex items-center dark:hover:bg-[#454548] dark:hover:text-gray-200">
        <div className="pl-4">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-[40px] w-[40px] z-50",
              },
            }}
          />
        </div>
        <button
          onClick={() => onOpen("profileSettings", { profile })}
          className="pl-4 cursor-pointer  h-full w-full flex justify-center  flex-col"
        >
          <p className=" text-xs text-gray-300 font-semibold flex items-center gap-x-1">
            {profile.name}
          </p>
          <p className=" text-xs text-gray-300 font-medium flex items-center gap-x-1">
            {profile.email}
          </p>
        </button>
      </div>
    </ActionTooltip>
  );
};
