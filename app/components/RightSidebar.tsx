"use client";

import { Dispatch, SetStateAction } from "react";
import { useFiredContext } from "../lib/FiredProvider";

export default function RightSidebar() {
  return (
    <aside className="md:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h2 className="font-semibold text-gray-900">People you may want fired</h2>
      <div className="mt-4 space-y-4">
        <PersonSuggestion name="Dawn Freshwater" role="University Destroyer" />
        <PersonSuggestion name="Sarah" role="Engineering Hermit" />
        <PersonSuggestion name="Greg" role="Senior Meeting Scheduler" />
      </div>
    </aside>
  );
}

function PersonSuggestion({ name, role }: { name: string; role: string }) {
  const { people, setPeople } = useFiredContext();
  if (!people.includes(name)) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-300"></div>
        <div className="flex-1">
          <p className="font-medium text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
        <button
          className="text-xs border border-blue-700 text-blue-700 rounded-full px-3 py-1 hover:bg-blue-50"
          onClick={() => setPeople([...people, name])}
        >
          Fire
        </button>
      </div>
    );
  }
}
