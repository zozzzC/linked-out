"use client";

import { useState } from "react";
import FiredFeed from "./components/FiredFeed";
import Profile from "./components/Profile";
import RightSidebar from "./components/RightSidebar";

export default function Home() {
  const [isPostOverlayOpen, setIsPostOverlayOpen] = useState(false);
  const [postText, setPostText] = useState("");

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            The professional network for ending careers.
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Connect. Report. Replace. LinkedOut helps you discover coworkers,
            rivals, and strangers who are still somehow employed.
          </p>

          <div className="mt-6 flex gap-3">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800">
              Get Started
            </button>
            <button className="bg-white text-blue-700 border border-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-blue-50">
              Ruin a Career
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <p className="font-semibold text-gray-800 mb-4">
            Trending on LinkedOut
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-4">
              <p className="font-medium text-gray-900">
                🚨 Greg just got fired from Deloitte
              </p>
              <p className="text-sm text-gray-500 mt-1">
                12 people endorsed this termination.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-4">
              <p className="font-medium text-gray-900">
                Emily is open to being replaced
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Skills: missed deadlines, vague updates, reply-all incidents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LinkedIn-style dashboard preview */}
      <section className="max-w-6xl mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-12 gap-4">
        <Profile />

        {/* Feed */}
        <main className="md:col-span-6 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Start a workplace rumor</p>

            <button
              type="button"
              onClick={() => setIsPostOverlayOpen(true)}
              className="mt-3 h-10 w-full rounded-full border border-gray-300 flex items-center px-4 text-gray-400 hover:bg-gray-50 text-left"
            >
              Who should be LinkedOut today?
            </button>
          </div>

          <FiredFeed />

          <FeedPost
            name="Corporate Compliance Bot"
            title="Official Termination Update"
            body="Congratulate John on his exciting new opportunity to spend more time at home."
          />

          <FeedPost
            name="Sarah from HR"
            title="Performance Concern"
            body="After careful review, Mike’s ability to open Excel has been marked as a potential business risk."
          />
        </main>

        <RightSidebar />
      </section>

      {isPostOverlayOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Start a workplace rumor
              </h2>

              <button
                type="button"
                onClick={() => setIsPostOverlayOpen(false)}
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="p-5">
              <textarea
                value={postText}
                onChange={(event) => setPostText(event.target.value)}
                placeholder="Who should be LinkedOut today?"
                className="min-h-40 w-full resize-none rounded-xl border border-gray-300 p-4 text-gray-900 outline-none focus:border-blue-700"
              />

              <div className="mt-4 flex items-center justify-between">
                <label className="cursor-pointer rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Attach image
                  <input type="file" accept="image/*" className="hidden" />
                </label>

                <button
                  type="button"
                  disabled={!postText.trim()}
                  onClick={() => {
                    console.log("Post:", postText);
                    setPostText("");
                    setIsPostOverlayOpen(false);
                  }}
                  className="rounded-full bg-blue-700 px-6 py-2 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function FeedPost({
  name,
  title,
  body,
}: {
  name: string;
  title: string;
  body: string;
}) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex gap-3">
        <div className="h-11 w-11 rounded-full bg-gray-300"></div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>

      <p className="mt-4 text-gray-800">{body}</p>

      <div className="mt-4 border-t pt-3 flex justify-between text-sm text-gray-500">
        <button className="hover:text-blue-700">Terminate</button>
        <button className="hover:text-blue-700">Comment</button>
        <button className="hover:text-blue-700">Escalate</button>
      </div>
    </article>
  );
}

