"use client";

import { useEffect, useState } from "react";
import FiredFeed from "./components/FiredFeed";
import Profile from "./components/Profile";
import RightSidebar from "./components/RightSidebar";

type Post = {
  name: string;
  title: string;
  body: string;
  id: string;
};

const anonymousRumours = [
  "heard you schedule meetings just to feel something",
  "apparently you say 'circle back' unironically",
  "someone said you open Excel and just stare at it",
  "rumor is you reply-all to everything",
  "people think your biggest contribution is typing 'thanks!'",
  "you once pushed to prod on a Friday and left early",
  "you introduce bugs just to feel important",
  "you say 'quick sync' and mean 2 hours",
  "you use dark mode but still make bad decisions",
  "your commits have no descriptions and it shows",
  "you’ve been 'working on that task' for 3 weeks",
  "your strongest skill is looking busy during standup",
  "someone said your calendar is full but your output is empty",
];

function generateRumourPost() {
  const count = Math.floor(Math.random() * 3) + 2;
  const shuffled = [...anonymousRumours].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count).join(". ") + ".";
}

export default function Home() {
  const [isPostOverlayOpen, setIsPostOverlayOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [postMode, setPostMode] = useState<"normal" | "ruin">("normal");

  useEffect(() => {
    const interval = setInterval(() => {
      const newPost: Post = {
        name: "Anonymous",
        title: "Anonymous > you",
        body: generateRumourPost(),
        id: crypto.randomUUID(),
      };

      setPosts((currentPosts) => [newPost, ...currentPosts]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  function handlePost() {
    if (!postText.trim()) return;

    const newPost: Post = {
      name: "Anonymous",
      title:
        postMode === "ruin" ? "Career Termination Request" : "Workplace Report",
      body: postText.trim(),
      id: crypto.randomUUID(),
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
    setPostText("");
    setIsPostOverlayOpen(false);
  }

  return (
    <main className="min-h-screen bg-gray-100">
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
            <button
              type="button"
              onClick={() => {
                setPostMode("normal");
                setPostText("");
                setIsPostOverlayOpen(true);
              }}
              className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800"
            >
              Get Started
            </button>

            <button
              type="button"
              onClick={() => {
                setPostMode("ruin");
                setIsPostOverlayOpen(true);
                setPostText("This person should be fired because...");
              }}
              className="bg-white text-blue-700 border border-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-blue-50"
            >
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

      <section className="max-w-6xl mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-12 gap-4">
        <Profile />

        <main className="md:col-span-6 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Start a workplace rumor</p>

            <button
              type="button"
              onClick={() => {
                setPostMode("normal");
                setPostText("");
                setIsPostOverlayOpen(true);
              }}
              className="mt-3 h-10 w-full rounded-full border border-gray-300 flex items-center px-4 text-gray-400 hover:bg-gray-50 text-left"
            >
              Who should be LinkedOut today?
            </button>
          </div>

          <FiredFeed />

          {posts.map((post, index) => (
            <FeedPost
              key={`${post.id}`}
              name={post.name}
              title={post.title}
              body={post.body}
            />
          ))}

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
                {postMode === "ruin"
                  ? "Ruin a Career"
                  : "Start a workplace rumor"}
              </h2>

              <button
                type="button"
                onClick={() => {
                  setIsPostOverlayOpen(false);
                  setPostText("");
                }}
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
                  onClick={handlePost}
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
  const [liked, setLiked] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const [laughed, setLaughed] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const likeCount = liked ? 1 : 0;
  const celebrateCount = celebrated ? 1 : 0;
  const hahaCount = laughed ? 1 : 0;

  function handleComment() {
    if (!commentText.trim()) return;

    setComments((currentComments) => [...currentComments, commentText.trim()]);

    setCommentText("");
  }

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

      {(likeCount > 0 ||
        celebrateCount > 0 ||
        hahaCount > 0 ||
        comments.length > 0) && (
        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <div>
            {likeCount > 0 && <span>👍 {likeCount} Like </span>}
            {celebrateCount > 0 && <span>🎉 {celebrateCount} Celebrate </span>}
            {hahaCount > 0 && <span>😂 {hahaCount} Haha</span>}
          </div>

          {comments.length > 0 && (
            <button
              type="button"
              onClick={() => setShowComments(!showComments)}
              className="hover:text-blue-700"
            >
              {comments.length} comment{comments.length === 1 ? "" : "s"}
            </button>
          )}
        </div>
      )}

      <div className="mt-4 border-t pt-3 flex justify-between text-sm text-gray-500">
        <button
          type="button"
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-1 hover:text-blue-700 ${
            liked ? "font-bold text-blue-700" : ""
          }`}
        >
          👍 Like
        </button>

        <button
          type="button"
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center gap-1 hover:text-blue-700 ${
            showComments ? "font-bold text-blue-700" : ""
          }`}
        >
          💬 Comment
        </button>

        <button
          type="button"
          onClick={() => setCelebrated(!celebrated)}
          className={`flex items-center gap-1 hover:text-yellow-600 ${
            celebrated ? "font-bold text-yellow-600" : ""
          }`}
        >
          🎉 Celebrate
        </button>

        <button
          type="button"
          onClick={() => setLaughed(!laughed)}
          className={`flex items-center gap-1 hover:text-orange-500 ${
            laughed ? "font-bold text-orange-500" : ""
          }`}
        >
          😂 Haha
        </button>
      </div>

      {showComments && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <div className="flex gap-2">
            <input
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleComment();
                }
              }}
              placeholder="Add a condescending comment..."
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-700"
            />

            <button
              type="button"
              disabled={!commentText.trim()}
              onClick={handleComment}
              className="rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Post
            </button>
          </div>

          {comments.length > 0 && (
            <div className="mt-4 space-y-3">
              {comments.map((comment, index) => (
                <div key={index} className="flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-300"></div>

                  <div className="rounded-2xl bg-gray-100 px-4 py-2">
                    <p className="text-sm font-semibold text-gray-900">
                      Anonymous
                    </p>
                    <p className="text-sm text-gray-700">{comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

