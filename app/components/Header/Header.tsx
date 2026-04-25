"use client";
import Image from "next/image";
import linkedOutLogo from "../../../public/linkedout.png";
import Login from "./Login";
import Link from "next/link";

export default function Header() {
  return (
    <div className="h-12 flex items-center justify-between w-full p-3">
      <div className="w-40 flex items-center">
        <Image src={linkedOutLogo} alt="linked out logo"></Image>
      </div>
      <div className="flex items-center justify-end gap-2 h-full">
        <Link className="font-bold" href="/jobs">
          Jobs
        </Link>
        <Login />
      </div>
    </div>
  );
}
