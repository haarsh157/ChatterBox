"use client";

import { useSocket } from "@/components/provider/socket-provider";
import { Badge } from "./ui/badge";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();
  if (!isConnected) {
    return (
      <div className="bg-yellow-600 text-white border-none w-2 h-2 rounded-full" />
    );
  }
  return (
    <div className="bg-emerald-600 text-white border-none w-2 h-2 rounded-full" />
  );
};
