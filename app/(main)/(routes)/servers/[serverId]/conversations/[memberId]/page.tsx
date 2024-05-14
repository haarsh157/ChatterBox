import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { findOrCreateConvo } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  };
}

const MemberIdPage = async ({ params }: MemberIdPageProps) => {
  const profile = await currentProfile();
  if (!profile) return redirect("/");

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id
    },
    include: {
      profile: true
    }
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await findOrCreateConvo(
    currentMember.id,
    params.memberId
  );

  if (!conversation) return redirect(`/servers/${params.serverId}`);

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <>
      <div className="flex flex-col h-screen">
        <div
          className={`flex flex-col h-full text-primary w-full  ${
            profile.bgImage !== null
              ? "dark:backdrop-brightness-90 dark:backdrop-blur-sm"
              : ""
          } `}
        >
          <ChatHeader
            serverId={params.serverId}
            name={otherMember.profile.name}
            type="conversation"
            imageUrl={otherMember.profile.imageUrl}
            bgImage={profile.bgImage}
          />
          <ChatInput
            name={otherMember.profile.name}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MemberIdPage;
