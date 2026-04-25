"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [user, setUser] = useState<string | undefined>(undefined);
  const [feed, setFeed] = useState<string[]>([]);

  useEffect(() => {
    //create 2 default users.
    const createUser = async (userName: string) => {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userName }),
      });
      setFeed([...feed, userName]);
    };
    createUser("dawn freshwater");
    createUser("ibrahim");
    console.log(feed);
  }, []);
  useEffect(() => {
    if (!session) return;

    const getUser = async () => {
      console.log("fetching...");
      const res = await fetch("/api/user");
      console.log(res);
    };
    getUser();
  }, [session]);

  if (session) {
    <div>
      <div>
        {feed.map((u) => (
          <p key={u}>u</p>
        ))}
      </div>
    </div>;
  } else {
    return (
      <div>
        <p>Please sign in.</p>
      </div>
    );
  }
}
