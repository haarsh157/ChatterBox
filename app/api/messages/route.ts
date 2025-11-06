// /pages/api/messages/[serverId]/[channelId].ts
import { currentProfilePages } from "@/lib/current-profile-pages";
import { NextApiResponseServerIO } from "@/types";
import { NextApiRequest } from "next";
import { messageQueue } from "@/lib/messageQueue";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = await currentProfilePages(req);
    const { content, fileUrl, replyTo, replyContent } = req.body;
    const { serverId, channelId } = req.query;

    if (!profile) return res.status(401).json({ error: "Unauthorised" });
    if (!serverId) return res.status(400).json({ error: "ServerId missing" });
    if (!channelId) return res.status(400).json({ error: "ChannelId missing" });
    if (!content) return res.status(400).json({ error: "Content missing" });

    await messageQueue.add({
      profileId: profile.id,
      serverId,
      channelId,
      content,
      fileUrl,
      replyTo,
      replyContent,
    });

    return res.status(200).json({ status: "queued" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal error" });
  }
}
