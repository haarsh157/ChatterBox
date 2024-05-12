"use client";

import { CreateServerlModal } from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";
import { ServerSettings } from "@/components/modals/server-settings";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <>
      <CreateServerlModal />
      <InviteModal />
      <ServerSettings />
    </>
  );
};
