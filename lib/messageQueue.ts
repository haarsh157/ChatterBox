// /lib/messageQueue.ts
import Queue from "bull";
import { redisConfig } from "./redisConfig";

export const messageQueue = new Queue("messages", {
  redis: redisConfig,
});
