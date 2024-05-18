import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Image from "next/image";
import JoinServerButton from "./join-server";

export const metadata = {
  title: "Invite Code",
};

interface InviteCodePageProps {
  params: {
    inviteCode: string;
    id: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
      id: params.id
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id
          }
        ]
      }
    }
  });

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="md:h-[400px] w-[600px] bg-[#333] rounded-xl md:p-4 p-8 flex flex-col items-center">
        <div className="flex justify-center items-center h-[50%] w-full p-4 m-4">
          <Image
            src={server.imageUrl}
            alt="server Image"
            className="rounded-full h-36 w-36"
            width={200}
            height={200}
          />
        </div>
        <div className="mt-4 text-center text-white font-bold text-2xl">
          You&apos;ve been invited to the server{" "}
          <span className=" text-indigo-400">{server.name}</span>
        </div>
        <JoinServerButton serverId={server.id} />
      </div>
    </div>
  );
};

export default InviteCodePage;
