import clientPromise from "@/app/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("sample_users");

    const users = await db.collection("users").find().limit(5).toArray();
    console.log("users");
    console.log(JSON.stringify(users));

    return NextResponse.json(users);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("sample_users");
    await db.collection("users").insertOne({
      username: body.username,
    });
    return NextResponse.json({ message: "Successfully created user!" });
  } catch {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
