"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <p>{session.user!.name}</p>
        <button onClick={() => signOut()}>Sign Out</button>
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
