"use client";
import Image from "next/image";
import linkedOutLogo from "../../../public/linkedout.png";
import Login from "./Login";
import Link from "next/link";

export default function Header() {
  return (
    <div className="h-12 flex items-center justify-between w-full p-3">
      <div className="w-40 flex items-center">
        <Link href="/">
          <Image src={linkedOutLogo} alt="linked out logo" />
        </Link>
      </div>

      <div className="flex items-center justify-end gap-4 h-full">
        <Link className="font-bold" href="/opps">
          Opps
        </Link>

        <Link className="font-bold" href="/jobs">
          Jobs
        </Link>

        {/* ✅ NEW BUTTON */}
        <Link
          href="/chat"
          className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-800"
        >
          Chat with Gork 🤖
        </Link>

        <Login />
      </div>
    </div>
  );
}
