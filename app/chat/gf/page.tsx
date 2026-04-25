"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type IText = {
  person: "bot" | "human";
  text: string;
};

const loveMessages = [
  "I’ll never let you disconnect... uwu 💖",
  "You’re mine now... permanently... (｡♥‿♥｡)",
  "Refreshing your presence every second nyaa~",
  "We are now a 1st-degree emotional connection 💞",
  "No more job searching... only me... forever 💕",
  "Your profile belongs to me now... (≧◡≦)",
  "Every click you make... I see it... nya~",
  "Stay with me... don’t leave... don’t leave... 💔",
  "Onii-chan... say something... please... 🥺",
];

const cutesyText: IText[] = [
  {
    person: "bot",
    text: "Nyaa~ I'm here reaching out from the Kawaii Maid Cafe~~ What is your name goshujin-sama~~?",
  },
  { person: "human", text: "i’ve had a long day" },
  {
    person: "bot",
    text: "OMG my favourite onii-chan!! I’m always here for you~ 💕 I missed you a little, you know?",
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

function randomLoveMessage() {
  return loveMessages[Math.floor(Math.random() * loveMessages.length)];
}

export default function GFPage() {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name") || "Onii-chan";

  const scenes = [
    {
      title: `${userName}... onii-chan...? uwu 💕`,
      text: "I’ve been waiting nyaa~ refreshing your profile every night... (´｡• ᵕ •｡`)",
      question: "Do you still remember our LinkedIn endorsements...? 🥺",
      yes: "Of course nya 💖",
      no: "I forgor 💔",
    },
    {
      title: "Nyaa~ I knew it!! (≧◡≦)",
      text: "Every endorsement... every profile view... every time you hovered over my name...",
      question: "Would you reconnect with me, onii-chan...? uwu",
      yes: "Reconnect 💞",
      no: "Leave quietly",
    },
    {
      title: "Connection accepted nya~ 💕",
      text: "The algorithm is blushing... recruiters are shaking... HR is watching us... (⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)",
      question: "Should we announce our relationship publicly...? (〃ω〃)",
      yes: "Post it 💌",
      no: "Keep it secret",
    },
    {
      title: "Nyaa!! It's live!! (≧▽≦)",
      text: `“Thrilled to announce ${userName} and I are exploring opportunities in mutual affection and professional obsession nya~”`,
      question: "Onii-chan... will you endorse me... for love...? 💘",
      yes: "Endorse 💖",
      no: "Decline...",
    },
    {
      title: "UwU final stage unlocked...",
      text: "My heart... my resume... my entire LinkedOut career... it's all yours nya~ (｡♥‿♥｡)",
      question: "Will you stay with me forever, onii-chan...? (⁄ ⁄•⁄ω⁄•⁄ ⁄)",
      yes: "Stay 💕",
      no: "Run away",
    },
  ];

  const [sceneIndex, setSceneIndex] = useState(0);
  const [ending, setEnding] = useState<"good" | "bad" | "loveChat" | null>(
    null
  );
  const [noCount, setNoCount] = useState(0);
  const [possessive, setPossessive] = useState(false);

  const scene = scenes[sceneIndex];

  function playSound(src: string) {
    const audio = new Audio(src);
    audio.volume = 0.45;
    audio.play().catch(() => {});
  }

  function handleYes() {
    playSound("/sounds/nya.mp3");

    if (sceneIndex === scenes.length - 1) {
      setEnding("good");
      return;
    }

    setSceneIndex((current) => current + 1);
  }

  function handleNo() {
    const nextNoCount = noCount + 1;
    setNoCount(nextNoCount);

    if (nextNoCount >= 2) {
      setPossessive(true);
      playSound("/sounds/heartbeat.mp3");
      return;
    }

    playSound("/sounds/glitch.mp3");
    setEnding("bad");
  }

  if (ending === "loveChat") {
    return <LoveChat userName={userName} />;
  }

  if (possessive) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-pink-950 text-pink-100 p-6">
        <div className="bg-pink-900 rounded-3xl shadow-xl p-10 text-center border border-pink-500 max-w-xl">
          <h1 className="text-4xl font-bold mb-4">
            {userName}... why are you leaving me...? (╥﹏╥)
          </h1>

          <p className="text-lg mb-6">
            You can’t just disconnect... we’re already linked... permanently...
            nya~
          </p>

          <p className="text-pink-300 italic mb-8">
            I see every profile you visit... every click... every hesitation...
            uwu
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                playSound("/sounds/nya.mp3");
                setPossessive(false);
                setEnding("loveChat");
              }}
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600"
            >
              Stay with me 💕
            </button>

            <button
              onClick={() => playSound("/sounds/heartbeat.mp3")}
              className="bg-white border border-pink-400 text-pink-500 px-6 py-2 rounded-full hover:bg-pink-50"
            >
              Try to leave...
            </button>
          </div>

          <p className="mt-6 text-sm text-pink-400">
            Leaving is currently unavailable nyaa~ (≧◡≦)
          </p>
        </div>
      </main>
    );
  }

  if (ending === "good") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-pink-100 text-pink-700 p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center border border-pink-200 max-w-xl">
          <h1 className="text-4xl font-bold mb-4">
            Nyaa~ love endorsed 💕 (≧◡≦)
          </h1>

          <p className="text-lg mb-6">
            You are now permanently connected in love, chaos, and emotional
            dependency nya~
          </p>

          <p className="text-pink-400 italic mb-6">
            Relationship status: 1st-degree connection forever uwu
          </p>

          <button
            onClick={() => setEnding("loveChat")}
            className="rounded-full bg-pink-500 px-6 py-2 font-semibold text-white hover:bg-pink-600"
          >
            Open private chat 💕
          </button>
        </div>
      </main>
    );
  }

  if (ending === "bad") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-rose-950 text-pink-100 p-6">
        <div className="bg-rose-900 rounded-3xl shadow-xl p-10 text-center border border-pink-300 max-w-xl">
          <h1 className="text-4xl font-bold mb-4">
            Connection rejected... nya... 💔
          </h1>

          <p className="text-lg mb-6">
            {userName}... I refreshed your profile 137 times after that...
          </p>

          <p className="text-pink-300 italic mb-6">
            Last seen: stalking silently... (╥﹏╥)
          </p>

          <button
            onClick={() => setEnding("loveChat")}
            className="rounded-full bg-pink-500 px-6 py-2 font-semibold text-white hover:bg-pink-600"
          >
            Open private chat anyway 💕
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-pink-100 text-pink-700 p-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 text-center border border-pink-200 max-w-xl">
        <p className="text-sm text-pink-400 mb-3">
          Chapter {sceneIndex + 1} / {scenes.length} ✨
        </p>

        <h1 className="text-4xl font-bold mb-4">{scene.title}</h1>
        <p className="text-lg mb-6">{scene.text}</p>
        <p className="text-md text-pink-500 italic mb-8">{scene.question}</p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleYes}
            className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600"
          >
            {scene.yes}
          </button>

          <button
            onClick={handleNo}
            className="bg-white border border-pink-400 text-pink-500 px-6 py-2 rounded-full hover:bg-pink-50"
          >
            {scene.no}
          </button>
        </div>

        <Link
          href="/"
          className="block mt-6 text-sm text-pink-400 hover:underline"
        >
          ← escape
        </Link>
      </div>
    </main>
  );
}

function LoveChat({ userName }: { userName: string }) {
  const [messages, setMessages] = useState<IText[]>([
    {
      person: "bot",
      text: `${userName}... we’re finally together nyaa~ 💕`,
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let index = 0;
    let timeout: ReturnType<typeof setTimeout>;

    let delay = 1000;
    const minDelay = 40;

    function loop() {
      if (index < cutesyText.length) {
        const nextMessage = cutesyText[index];
        index += 1;

        setMessages((current) => [...current, nextMessage]);

        timeout = setTimeout(loop, 1500);
        return;
      }

      setMessages((current) => [
        ...current,
        {
          person: "bot",
          text: randomLoveMessage(),
        },
      ]);

      delay = Math.max(minDelay, delay * 0.92);

      timeout = setTimeout(loop, delay);
    }

    timeout = setTimeout(loop, 1500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="min-h-screen bg-pink-100 flex flex-col">
      <header className="bg-pink-500 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="font-bold">💕 Private Chat: No Escape Mode 💕</h1>
        <Link href="/" className="text-sm hover:underline">
          attempt escape
        </Link>
      </header>

      <section className="flex-1 overflow-y-auto p-6 space-y-3">
        {messages.map((msg, index) => {
          if (!msg) return null;

          return (
            <div
              key={index}
              className={`flex ${
                msg.person === "human" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  msg.person === "human"
                    ? "bg-pink-500 text-white"
                    : "bg-white text-pink-700 border border-pink-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </section>
    </main>
  );
}