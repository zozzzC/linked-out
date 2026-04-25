"use client";
import { useState } from "react";
import Chat from "./Chat";
import { MessageCircle } from "lucide-react";

export default function ChatBar() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className=" p-6 flex fixed bottom-0 right-0 items-center">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        >
          <MessageCircle size={22} />
        </button>
      )}
      {open ? <Chat /> : null}
    </div>
  );
}
