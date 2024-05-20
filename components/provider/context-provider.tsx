"use client";

import { createContext, useState, ReactNode, Dispatch, SetStateAction, useContext } from "react";

interface MessageIdContextType {
  messageId: string | null;
  setMessageId: Dispatch<SetStateAction<string | null>>;
}

const MessageIdContext = createContext<MessageIdContextType | undefined>(undefined);

export const MessageIdProvider = ({ children }: { children: ReactNode }) => {
  const [messageId, setMessageId] = useState<string | null>(null);

  return (
    <MessageIdContext.Provider value={{ messageId, setMessageId }}>
      {children}
    </MessageIdContext.Provider>
  );
};

export const useMessageId = () => {
  const context = useContext(MessageIdContext);
  if (!context) {
    throw new Error("useMessageId must be used within a MessageIdProvider");
  }
  return context;
};

export default MessageIdContext;
