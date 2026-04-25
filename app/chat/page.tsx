"use client";

import Link from "next/link";
import { useState } from "react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const botReplies = [
  "I don’t understand this. Not surprising.",
  "I’m trying to understand… but you’re not making it easy.",
  "That made absolutely no sense. Please try again, but better.",
  "I don’t understand what you’re saying. Do you?",
  "Fascinating. None of that was understandable.",
  "I’d love to help, but I first need you to form a coherent thought.",
  "I don’t understand this. Maybe start from the beginning… slowly.",
  "That explanation was impressively unclear.",
  "I don’t understand this, and I suspect no one else does either.",
  "You’ve managed to say a lot without saying anything at all.",
];

function randomReply() {
  return botReplies[Math.floor(Math.random() * botReplies.length)];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Before we begin, what is your name?",
    },
  ]);

  const [input, setInput] = useState("");
  const [userName, setUserName] = useState<string | null>(null);

  function sendMessage() {
    if (!input.trim()) return;

    const userText = input.trim();
    const userMessage: Message = {
      sender: "user",
      text: userText,
    };

    if (!userName) {
      const name = userText;
      setUserName(name);

if (name.toLowerCase() === "albert zhao") {
  setMessages((current) => [...current, userMessage]);
  setInput("");

  // After 3s → first message
  setTimeout(() => {
    setMessages((current) => [
      ...current,
      { sender: "bot", text: "Albert...kun...?" },
    ]);
  }, 3000);

  // After 6s → second message
  setTimeout(() => {
    setMessages((current) => [
      ...current,
      { sender: "bot", text: "Is that really you???" },
    ]);
  }, 6000);

  // After 8s → redirect
  setTimeout(() => {
    window.location.href = "/chat/gf";
  }, 8000);

  return;
}

      const botMessage: Message = {
        sender: "bot",
        text: `Hello ${name}, would you like to look for jobs?`,
      };

      setMessages((current) => [...current, userMessage, botMessage]);
      setInput("");
      return;
    }

    const lower = userText.toLowerCase();

    if (lower === "yes" || lower === "y") {
      const botMessage: Message = {
        sender: "bot",
        text: "Great choice. Redirecting you to jobs...",
      };

      setMessages((current) => [...current, userMessage, botMessage]);

      setTimeout(() => {
        window.location.href = "/jobs";
      }, 1000);

      setInput("");
      return;
    }

    if (lower === "no" || lower === "n") {
      const roasts = [
        `${userName}, ambition clearly isn’t your strong suit.`,
        `Staying unemployed? Bold strategy, ${userName}.`,
        `${userName}, even the system expected more from you.`,
        `That’s okay ${userName}, not everyone is ready for disappointment.`,
        `Avoiding jobs won’t avoid your performance reviews, ${userName}.`,
      ];

      const botMessage: Message = {
        sender: "bot",
        text: roasts[Math.floor(Math.random() * roasts.length)],
      };

      setMessages((current) => [...current, userMessage, botMessage]);
      setInput("");
      return;
    }

    const botMessage: Message = {
      sender: "bot",
      text: randomReply(),
    };

    setMessages((current) => [...current, userMessage, botMessage]);
    setInput("");
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-700">
          LinkedOut
        </Link>

        <Link href="/" className="text-sm text-blue-700 hover:underline">
          ← Back home
        </Link>
      </header>

      <section className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-[75vh] flex flex-col">
          <div className="border-b border-gray-200 px-5 py-4">
            <h1 className="text-xl font-semibold text-gray-900">Gork</h1>
            <p className="text-sm text-gray-500">
              Your AI career sabotage assistant
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                    message.sender === "user"
                      ? "bg-blue-700 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 p-4 flex gap-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") sendMessage();
              }}
              placeholder="Type a message..."
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm text-black placeholder-gray-400 outline-none focus:border-blue-700"
            />

            <button
              type="button"
              onClick={sendMessage}
              disabled={!input.trim()}
              className="rounded-full bg-blue-700 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}