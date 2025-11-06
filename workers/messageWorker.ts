// /workers/messageWorker.ts
import { messageQueue } from "@/lib/messageQueue";
import { db } from "@/lib/db";
import { redisConfig } from "@/lib/redisConfig";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

async function setupSocket() {
  const io = new Server(3001, {
    cors: { origin: "*" },
  });

  const pubClient = createClient({ url: `redis://${redisConfig.host}:${redisConfig.port}` });
  const subClient = pubClient.duplicate();

  await Promise.all([pubClient.connect(), subClient.connect()]);
  io.adapter(createAdapter(pubClient, subClient));

  return io;
}

(async () => {
  const io = await setupSocket();

  messageQueue.process(async (job) => {
    const { profileId, serverId, channelId, content, fileUrl, replyTo, replyContent } = job.data;

    try {
      const server = await db.server.findFirst({
        where: { id: serverId as string },
        include: { members: true },
      });

      if (!server) return;

      const member = server.members.find((m) => m.profileId === profileId);
      if (!member) return;

      const message = await db.message.create({
        data: {
          content,
          fileUrl,
          replyTo,
          replyContent,
          channelId: channelId as string,
          memberId: member.id,
        },
        include: {
          member: { include: { profile: true } },
        },
      });

      const channelKey = `chat:${channelId}:messages`;
      io.emit(channelKey, message);

      console.log("✅ Message processed & emitted:", message.id);
    } catch (err) {
      console.error("❌ Message processing failed:", err);
      throw err; // Bull will retry automatically
    }
  });
})();
