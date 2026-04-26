"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <aside className="md:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-5 w-full">
      <div className="h-16 bg-blue-700 rounded-t-lg"></div>
      <Image
        className="h-16 w-16 bg-gray-300 rounded-full border-4 border-white -mt-8 mx-auto"
        src={
          session?.user?.image ??
          "https://images.unsplash.com/photo-1565300667498-2843c56b4603?q=80&w=1030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        width={100}
        height={100}
        alt="user image"
      ></Image>

      <h2 className="text-center font-semibold mt-2">{session?.user?.name}</h2>
      <p className="text-center text-sm text-gray-500">
        Junior Career Assassin
      </p>

      <div className="mt-4 border-t pt-4 text-sm text-gray-600 space-y-2">
        <p>
          Connections sabotaged: <strong>12</strong>
        </p>
        <p>
          Reports filed: <strong>34</strong>
        </p>
        <p>
          Careers ended: <strong>7</strong>
        </p>
      </div>
    </aside>
  );
}
