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
          apiKey: "lgHhe1rUocPRfSQpahWj",
          apiSecret: "711D4ILb4zZcFs9uzSN6PRBnj3QmclrNTOh",
          userUid: "1",
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
