"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { Coworker } from "./RightSidebar";
import { CoworkerWithUuid } from "../opps/page";
export default function Opp({
  name,
  role,
  id,
  reply,
  setOpps,
  opps,
}: {
  name: string;
  role: string;
  id: string;
  reply: string;
  setOpps: Dispatch<SetStateAction<CoworkerWithUuid[]>>;
  opps: CoworkerWithUuid[];
}) {
  const [opp, setOpp] = useState<boolean>(false);
  const [num] = useState(() => Math.floor(Math.random() * 99));
  const avatar = `https://randomuser.me/api/portraits/men/${num}.jpg`;
  return (
    <div>
      <aside className="md:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-4 min-h-64 flex flex-col">
        <div className="h-16 bg-blue-700 rounded-t-lg"></div>
        <Image
          className="h-16 w-16 bg-gray-300 rounded-full border-4 border-white -mt-8 mx-auto"
          src={avatar}
          width={100}
          height={100}
          alt="user image"
        ></Image>
        <h2 className="text-center font-semibold mt-2">{name}</h2>
        <p className="text-center text-sm text-gray-500">{role}</p>
        <div className="h-full grow flex items-center justify-center">
          <button
            className="bg-blue-700 py-2 px-3 rounded-2xl font-semibold text-white"
            onClick={() => {
              setOpp(!opp);
              const exists = opps.some((o) => o.id === id);
              if (!exists) {
                setOpps(() => {
                  return [
                    ...opps,
                    { id: id, name: name, role: role, oppReply: reply },
                  ];
                });
              }
            }}
          >
            {opp ? <p>Un-Declare Opp</p> : <p>Declare Opp</p>}
          </button>
        </div>
      </aside>
    </div>
  );
}
