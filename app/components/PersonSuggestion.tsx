"use client";
import Image from "next/image";
import { Coworker } from "./RightSidebar";
import { useEffect, useState } from "react";

export default function PersonSuggestion({
  person,
  onFireClick,
}: {
  person: Coworker;
  onFireClick: () => void;
}) {
  const [num, setNum] = useState<number | null>(null);

  useEffect(() => {
    setNum(Math.floor(Math.random() * 99));
  }, []);
  const avatar = `https://randomuser.me/api/portraits/men/${num}.jpg`;
  return (
    <div className="flex items-center gap-3">
      <Image
        alt={`${person.name} photo`}
        className="h-10 w-10 rounded-full"
        src={avatar}
        height={100}
        width={100}
      ></Image>

      <div className="flex-1">
        <p className="font-medium text-gray-900">{person.name}</p>
        <p className="text-xs text-gray-500">{person.role}</p>
      </div>

      <button
        className="text-xs border border-blue-700 text-blue-700 rounded-full px-3 py-1 hover:bg-blue-50"
        onClick={onFireClick}
      >
        Fire
      </button>
    </div>
  );
}
