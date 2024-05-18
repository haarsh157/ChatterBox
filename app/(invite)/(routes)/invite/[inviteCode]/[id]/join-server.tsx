"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface JoinServerButtonProps {
  serverId: string;
}

const JoinServerButton = ({ serverId }: JoinServerButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/servers/${serverId}`);
  };

  return (
    <Button
      onClick={handleClick}
      className="rounded-xl my-8 w-full md:w-64 p-6"
      variant="primary"
    >
      Join Server
    </Button>
  );
};

export default JoinServerButton;
