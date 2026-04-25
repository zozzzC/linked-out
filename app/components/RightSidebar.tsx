"use client";

import { useState } from "react";
import { useFiredContext } from "../lib/FiredProvider";

type Coworker = {
  id: string;
  name: string;
  role: string;
};

const firstNames = [
  "Ibrahim",
  "Marie",
  "Sarah",
  "I An",
  "Ambrose",
  "Albert",
  "Connor",
  "Jade",
  "Trevor",
  "Aiswarya",
  "Taara",
  "Dawn",
  "Sean",
  "Thomas",
];

const lastNames = [
  "Waheed",
  "Patlong",
  "Sellier",
  "Park",
  "Brooke-Munns",
  "Zhao",
  "Hare",
  "Li",
  "McGurk",
  "GS",
  "Siva",
  "Freshwater",
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
    id: crypto.randomUUID(),
    name: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
    role: randomItem(roles),
  };
}

export default function RightSidebar() {
  const [suggestions, setSuggestions] = useState<Coworker[]>([
    { id: crypto.randomUUID(), name: "Dawn Freshwater", role: "University Destroyer" },
    { id: crypto.randomUUID(), name: "Karthik Siva", role: "Fire Starter" },
    { id: crypto.randomUUID(), name: "Ibrahim Waheed", role: "Makers Club Dictator" },
    makeCoworker(),
    makeCoworker(),
    makeCoworker(),
  ]);

  function replaceSuggestion(id: string) {
    setSuggestions((currentSuggestions) =>
      currentSuggestions.map((person) =>
        person.id === id ? makeCoworker() : person
      )
    );
  }

  return (
    <aside className="md:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h2 className="font-semibold text-gray-900">People you may want fired</h2>

      <div className="mt-4 space-y-4">
        {suggestions.map((person) => (
          <PersonSuggestion
            key={person.id}
            person={person}
            onFired={() => replaceSuggestion(person.id)}
          />
        ))}
      </div>
    </aside>
  );
}

function PersonSuggestion({
  person,
  onFired,
}: {
  person: Coworker;
  onFired: () => void;
}) {
  const { people, setPeople } = useFiredContext();

  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-gray-300" />

      <div className="flex-1">
        <p className="font-medium text-gray-900">{person.name}</p>
        <p className="text-xs text-gray-500">{person.role}</p>
      </div>

      <button
        className="text-xs border border-blue-700 text-blue-700 rounded-full px-3 py-1 hover:bg-blue-50"
        onClick={() => {
          setPeople([...people, person.name]);
          onFired();
        }}
      >
        Fire
      </button>
    </div>
  );
}