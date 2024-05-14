import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

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

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  return (
    <>
      <div>Invitecodepage</div>
    </>
  );
};

export default InviteCodePage;
