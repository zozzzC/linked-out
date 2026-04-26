"use client";
import { useEffect, useState } from "react";
import Profile from "../components/Profile";
import { Coworker, makeCoworker } from "../components/RightSidebar";
import Opp from "../components/Opp";

export interface CoworkerWithUuid extends Coworker {
  id: string;
  oppReply: string;
}

const oppReplies = [
  "Rent free already? I’m flattered.",
  "Opp? You had to qualify first.",
  "I don’t even know who you are.",
  "You named me your opp before introducing yourself?",
  "You vs me is a mismatch.",
  "Damn, I made the leaderboard?",
  "Bold of you to assume we’re rivals.",
  "Can’t be your opp if I never noticed you.",
  "You made me your opp? HR will hear about this.",
];

export default function Opps() {
  const [coworkers, setCoworkers] = useState<CoworkerWithUuid[]>([]);
  const [opps, setOpps] = useState<CoworkerWithUuid[]>([]);

  useEffect(() => {
    const c: CoworkerWithUuid[] = [];
    for (let i = 0; i < 9; i++) {
      c.push({
        ...makeCoworker(),
        id: crypto.randomUUID(),
        oppReply: oppReplies[i],
      });
    }
    setCoworkers(c);
  }, []);

  return (
    <div className="h-screen">
      <div className="h-full items-center grid grid-cols-3 gap-5">
        <div className="items-center justify-center p-3 col-span-1 rounded-2xl flex flex-col gap-5 h-full">
          <Profile />
          <div className="w-72 bg-white rounded-xl shadow p-4 max-h-96 min-h-20 overflow-y-auto">
            <h2 className="font-semibold mb-3">Inbox</h2>
            <div className="flex flex-col gap-5">
              {opps.length === 0 ? <p>You have no new messages.</p> : null}
              {opps.toReversed().map((o) => {
                return (
                  <div
                    key={o.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 border border-gray-100"
                  >
                    <div className="mb-2">
                      <p className="text-base font-semibold text-blue-700">
                        {o.name}
                      </p>
                      <p className="text-sm text-gray-500">{o.role}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <p className={`text-sm leading-relaxed text-gray-700`}>
                        {o.oppReply}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="gap-5 p-3 grid grid-cols-3 col-span-2 rounded-2xl">
          {coworkers.map((c) => {
            return (
              <Opp
                name={c.name}
                key={c.id}
                id={c.id}
                reply={c.oppReply}
                role={c.role}
                setOpps={setOpps}
                opps={opps}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
