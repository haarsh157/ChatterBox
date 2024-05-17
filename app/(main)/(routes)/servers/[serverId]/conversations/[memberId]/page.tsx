import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { findOrCreateConvo } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  };
  searchParams: {
    video?: boolean;
  };
}

const MemberIdPage = async ({ params, searchParams }: MemberIdPageProps) => {
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
            username={otherMember.profile.username}
            type="conversation"
            imageUrl={otherMember.profile.imageUrl}
            bgImage={profile.bgImage}
          />
          {searchParams.video && (
            <MediaRoom chatId={conversation.id} video={true} audio={true} />
          )}
          {!searchParams.video && (
            <>
              <ChatMessages
                member={currentMember}
                name={otherMember.profile.name}
                username={otherMember.profile.username}
                chatId={conversation.id}
                type="conversation"
                apiUrl="/api/direct-messages"
                paramKey="conversationId"
                paramValue={conversation.id}
                socketUrl="/api/socket/direct-messages"
                socketQuery={{
                  conversationId: conversation.id
                }}
                imageUrl={otherMember.profile.imageUrl}
              />
              <ChatInput
                name={otherMember.profile.name}
                type="conversation"
                apiUrl="/api/socket/direct-messages"
                query={{
                  conversationId: conversation.id
                }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MemberIdPage;
