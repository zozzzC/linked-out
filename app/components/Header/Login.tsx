"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <p>Just put the fries in the bag {session.user!.name}...</p>
      </div>
    );
  }
  return (
    <>
      <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
        Sign In
      </button>
    </>
  );
}
