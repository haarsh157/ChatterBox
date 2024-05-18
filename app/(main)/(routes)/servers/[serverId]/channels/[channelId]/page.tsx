import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) return redirect("/");

  const server = await db.server.findFirst({
    where: {
      id: params.serverId
    },
    include: {
      members: {
        include: {
          profile: true
        }
      }
    }
  });

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId
    }
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id
    },
    include: {
      profile: true
    }
  });

  if (!channel || !member) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col h-screen">
      <div
        className={`flex flex-col h-full text-primary w-full  ${
          profile.bgImage !== null
            ? "dark:backdrop-brightness-90 dark:backdrop-blur-sm"
            : ""
        } `}
      >
        <ChatHeader
          serverId={channel.serverId}
          name={channel.name}
          username={profile.username}
          type="channel"
          bgImage={profile.bgImage}
        />
        {channel.type === ChannelType.TEXT && (
          <>
            <ChatMessages
              name={channel.name}
              member={member}
              server={server}
              username={profile.username}
              chatId={channel.id}
              type="channel"
              apiUrl="/api/messages"
              socketQuery={{
                channelId: channel.id,
                serverId: channel.serverId
              }}
              socketUrl="/api/socket/messages"
              paramKey="channelId"
              paramValue={channel.id}
              imageUrl={""}
            />
            <ChatInput
              name={channel.name}
              type="channel"
              apiUrl="/api/socket/messages"
              query={{ channelId: channel.id, serverId: channel.serverId }}
            />
          </>
        )}
        {channel.type === ChannelType.AUDIO && (
          <>
            <MediaRoom chatId={channel.id} video={false} audio={true} />
          </>
        )}
        {channel.type === ChannelType.VIDEO && (
          <>
            <MediaRoom chatId={channel.id} video={true} audio={true} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChannelIdPage;
