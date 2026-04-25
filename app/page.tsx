"use client";
import ChatBar from "./components/Chat/ChatBar";
import FiredFeed from "./components/FiredFeed";
import Profile from "./components/Profile";
import RightSidebar from "./components/RightSidebar";
import { useFiredContext } from "./lib/FiredProvider";

export default function Home() {
  const { people } = useFiredContext();

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
            <div className="mt-3 h-10 rounded-full border border-gray-300 flex items-center px-4 text-gray-400">
              Who should be LinkedOut today?
            </div>
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

        {/* Right Sidebar */}
        <RightSidebar />

        <ChatBar />
      </section>
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
