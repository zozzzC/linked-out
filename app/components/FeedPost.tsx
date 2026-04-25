"use client";

import { useState } from "react";

export default function FeedPost({
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

    setComments((current) => [...current, commentText.trim()]);
    setCommentText("");
  }

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      {/* Header */}
      <div className="flex gap-3">
        <div className="h-11 w-11 rounded-full bg-gray-300"></div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>

      {/* Body */}
      <p className="mt-4 text-gray-800">{body}</p>

      {/* Reactions Summary */}
      {(likeCount > 0 ||
        celebrateCount > 0 ||
        hahaCount > 0 ||
        comments.length > 0) && (
        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <div>
            {likeCount > 0 && <span>👍 {likeCount} </span>}
            {celebrateCount > 0 && <span>🎉 {celebrateCount} </span>}
            {hahaCount > 0 && <span>😂 {hahaCount}</span>}
          </div>

          {comments.length > 0 && (
            <button
              onClick={() => setShowComments(!showComments)}
              className="hover:text-blue-700"
            >
              {comments.length} comment{comments.length === 1 ? "" : "s"}
            </button>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-4 border-t pt-3 flex justify-between text-sm text-gray-500">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-1 hover:text-blue-700 ${
            liked ? "font-bold text-blue-700" : ""
          }`}
        >
          👍 Like
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center gap-1 hover:text-blue-700 ${
            showComments ? "font-bold text-blue-700" : ""
          }`}
        >
          💬 Comment
        </button>

        <button
          onClick={() => setCelebrated(!celebrated)}
          className={`flex items-center gap-1 hover:text-yellow-600 ${
            celebrated ? "font-bold text-yellow-600" : ""
          }`}
        >
          🎉 Celebrate
        </button>

        <button
          onClick={() => setLaughed(!laughed)}
          className={`flex items-center gap-1 hover:text-orange-500 ${
            laughed ? "font-bold text-orange-500" : ""
          }`}
        >
          😂 Haha
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 border-t pt-4">
          <div className="flex gap-2">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleComment();
              }}
              placeholder="Add a condescending comment..."
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-700"
            />

            <button
              disabled={!commentText.trim()}
              onClick={handleComment}
              className="rounded-full bg-blue-700 px-4 py-2 text-white text-sm font-semibold hover:bg-blue-800 disabled:bg-gray-300"
            >
              Post
            </button>
          </div>

          {comments.length > 0 && (
            <div className="mt-4 space-y-3">
              {comments.map((comment, i) => (
                <div key={i} className="flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <p className="text-sm font-semibold">Anonymous</p>
                    <p className="text-sm">{comment}</p>
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