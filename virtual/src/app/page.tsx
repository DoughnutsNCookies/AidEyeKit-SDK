"use client";

import {
  CharacterRoom,
  getQuotedTexts,
} from "@virtual-protocol/react-virtual-ai";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);

  return (
    <main className="h-screen">
      <CharacterRoom
        userName="User"
        virtualName="Lady"
        virtualId={1}
        metadata={{
          apiKey: process.env.VIRTUAL_KEY,
          apiSecret: process.env.VIRTUAL_PRIVATE,
          userUid: "1", // any unique user identifier that will be used for runner memory core to remember conversations
          userName: "User",
        }}
        onUserMessageCreated={async (v) => {
          console.log("user", v);
          setMessages((prev) => [...prev, v.text]);
        }}
        onVirtualMessageCreated={async (v) => {
          console.log("virtual", v);
          setMessages((prev) => [
            ...prev,
            getQuotedTexts(v.text ?? "").join(" "),
          ]);
        }}
        configs={{
          skipTTS: true,
        }}
      />
      <div className="absolute bottom-0 left-0 w-[25vw] h-[50%]">
        {messages.map((message, index) => (
          <div key={index} className="p-4">
            {message}
          </div>
        ))}
      </div>
    </main>
  );
}
