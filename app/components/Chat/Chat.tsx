"use client";

import { useEffect, useState } from "react";
import BotMessage from "./BotMessage";
import HumanMessage from "./HumanMessage";
import { Send } from "lucide-react";

interface IText {
  person: "bot" | "human";
  text: string;
}
export default function Chat() {
  const [turn, setTurn] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [autoRun, setAutoRun] = useState<boolean>(false);
  const [text, setText] = useState<IText[]>([
    {
      person: "bot",
      text: "Nyaa~ I'm here reaching out from the Kawaii Maid Cafe~~ What is your name goshujin-sama~~?",
    },
  ]);

  const cutesyText: IText[] = [
    {
      person: "bot",
      text: "OMG my favourite onii-chan!! I’m always here for you~ 💕 I missed you a little, you know?",
    },

    { person: "human", text: "i’ve had a long day" },
    {
      person: "bot",
      text: "Aww come here~ you did so well today… I’m proud of you, okay? 🫶",
    },

    { person: "human", text: "what are you doing?" },
    {
      person: "bot",
      text: "Just thinking about you… like I usually do hehe~ 💭✨",
    },

    { person: "human", text: "you’re kinda cute" },
    {
      person: "bot",
      text: "W-whaaat?! Don’t just say that so casually… I’ll get flustered >///<",
    },

    { person: "human", text: "do you like me?" },
    {
      person: "bot",
      text: "…You already know the answer to that, don’t you? 💗",
    },

    { person: "human", text: "i feel tired" },
    {
      person: "bot",
      text: "Then rest a bit, okay? I’ll stay right here with you… no need to rush anything 🌙",
    },

    { person: "human", text: "tell me something nice" },
    {
      person: "bot",
      text: "You’re doing better than you think… and I really, really like being with you 💕",
    },

    { person: "human", text: "don’t leave me" },
    {
      person: "bot",
      text: "I’m not going anywhere… I’m yours to talk to whenever you need me 🤍",
    },

    { person: "human", text: "goodnight" },
    {
      person: "bot",
      text: "Goodnight~ sleep well… I’ll be here when you wake up, okay? 🌸✨",
    },
  ];

  function sendMessage(message: string) {
    setText([...text, { person: "human", text: message }]);

    if (message.includes("x") || message.includes("X")) {
      setAutoRun(true);
      let index = 0;
      setTimeout(() => {
        setText((prev) => [...prev, cutesyText[index]]);
        index++;
      }, 1000);
    }
  }

  return (
    <div className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-3 font-semibold">Chat</div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50">
        {text.map((msg, i) => (
          <div
            key={i}
            className={`text-sm max-w-[80%] px-3 py-2 rounded-lg ${
              msg.person === "human"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div className="p-2 border-t flex items-center gap-2 ">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 border rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            disabled={autoRun}
          />
          <button
            onClick={() => sendMessage(input)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
