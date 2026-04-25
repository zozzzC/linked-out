"use client";

import { useEffect, useState } from "react";
import { useFiredContext } from "../lib/FiredProvider";

type Coworker = {
  id: string;
  name: string;
  role: string;
};

const firstNames = [
  "Ibrahim", "Marie", "Sarah", "I An", "Ambrose", "Albert", "Connor",
  "Jade", "Trevor", "Aiswarya", "Taara", "Dawn", "Sean", "Thomas",
];

const lastNames = [
  "Waheed", "Patlong", "Sellier", "Park", "Brooke-Munns", "Zhou",
  "Hare", "Li", "McGurk", "GS", "Siva", "Freshwater",
];

const roles = [
  "Senior Meeting Scheduler",
  "Junior Analyst",
  "HR Business Partner",
  "Compliance Officer",
  "Product Manager",
  "Finance Department",
  "Office Vibe Curator",
  "Spreadsheet Destroyer",
  "Reply-All Specialist",
  "Calendar Blocker",
  "Synergy Evangelist",
  "Deadline Dodger",
];

function randomItem(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

function makeCoworker(): Coworker {
  return {
    id: `${Date.now()}-${Math.random()}`,
    name: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
    role: randomItem(roles),
  };
}

export default function RightSidebar() {
  const { people, setPeople } = useFiredContext();

  const [suggestions, setSuggestions] = useState<Coworker[]>([
    {
      id: "dawn-freshwater",
      name: "Dawn Freshwater",
      role: "University Destroyer",
    },
    {
      id: "karthik-siva",
      name: "Karthik Siva",
      role: "Fire Starter",
    },
    {
      id: "ibrahim-waheed",
      name: "Ibrahim Waheed",
      role: "Makers Club Dictator",
    },
  ]);

  const [selectedPerson, setSelectedPerson] = useState<Coworker | null>(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    setSuggestions((currentSuggestions) => [
      ...currentSuggestions,
      makeCoworker(),
      makeCoworker(),
      makeCoworker(),
    ]);
  }, []);

  function replaceSuggestion(id: string) {
    setSuggestions((currentSuggestions) =>
      currentSuggestions.map((person) =>
        person.id === id ? makeCoworker() : person
      )
    );
  }

  function confirmFire() {
    if (!selectedPerson) return;

    setPeople([...people, selectedPerson.name]);
    replaceSuggestion(selectedPerson.id);
    setSelectedPerson(null);
    setReason("");
  }

  return (
    <>
      <aside className="md:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h2 className="font-semibold text-gray-900">
          People you may want fired
        </h2>

        <div className="mt-4 space-y-4">
          {suggestions.map((person) => (
            <PersonSuggestion
              key={person.id}
              person={person}
              onFireClick={() => setSelectedPerson(person)}
            />
          ))}
        </div>
      </aside>

      {selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Fire {selectedPerson.name}?
              </h2>

              <button
                type="button"
                onClick={() => {
                  setSelectedPerson(null);
                  setReason("");
                }}
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="p-5">
              <label className="text-sm font-medium text-gray-700">
                Enter reason, this can be anything from poor performance to
                unforgivable reply-all behavior.
              </label>

              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Example: Scheduled a 7:30am meeting called 'quick sync'"
                className="mt-3 min-h-28 w-full resize-none rounded-xl border border-gray-300 p-3 text-gray-900 outline-none focus:border-blue-700"
              />

              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPerson(null);
                    setReason("");
                  }}
                  className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={confirmFire}
                  className="rounded-full bg-blue-700 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  Confirm Fire
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PersonSuggestion({
  person,
  onFireClick,
}: {
  person: Coworker;
  onFireClick: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-gray-300" />

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