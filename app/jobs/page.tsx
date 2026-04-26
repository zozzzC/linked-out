"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";

const mockJobs = [
  {
    title: "Burger Bagger",
    company: "McDonalds",
    location: "Auckland, NZ",
    type: "Full-time",
    description:
      "Minimum requirements: PhD in Management, 5+ years in sales, 30+ years experience.",
    replies: [
      "No way bro.",
      "We were looking for someone with at least 40 years of burger-adjacent leadership experience.",
      "Your application has been carefully ignored.",
      "Unfortunately, your PhD was not burger-focused enough.",
      "We regret to inform you that the fries showed more initiative.",
    ],
  },
  {
    title: "Executive Vibecoder",
    company: "AI Startup #2000",
    location: "Remote",
    type: "Contract",
    description:
      "Needing an experienced vibecoder to join our founding team. Must be willing to work 50 hours a week with no pay. This is a great opportunity for someone to get experience.",
    replies: [
      "Do you have 30+ years of experience with JavaScript??? If not do not even bother replying.",
      "We need someone more passionate about unpaid labor.",
      "Your vibes were not scalable.",
      "Unfortunately, your code had syntax and your energy had none.",
      "We are moving forward with a candidate who agreed to be paid in exposure.",
    ],
  },
  {
    title: "Scam Caller",
    company: "Fake NZ Police",
    location: "Wellington, NZ",
    type: "Full-time",
    description: "Help us call over 10000+ people a month!",
    replies: [
      "Do you live alone?",
      "Your voice was not suspicious enough.",
      "We need someone who can say ‘urgent bank transfer’ with more conviction.",
      "Unfortunately, you sounded too trustworthy.",
      "Please reapply once your moral compass is less active.",
    ],
  },
];

type Reply = {
  id: string;
  jobIndex: number;
  message: string;
  loading?: boolean;
};

function randomItem(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

export default function JobsBoard() {
  const [query, setQuery] = useState("");
  const [replies, setReplies] = useState<Reply[]>([]);

  const filteredJobs = mockJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()),
  );

  function showReply(jobIndex: number) {
    const job = mockJobs[jobIndex];
    const tempId = `${Date.now()}-${Math.random()}`;

    setReplies((currentReplies) => [
      ...currentReplies,
      {
        id: tempId,
        jobIndex,
        message: "Reviewing application...",
        loading: true,
      },
    ]);

    setTimeout(() => {
      setReplies((currentReplies) =>
        currentReplies.map((reply) =>
          reply.id === tempId
            ? {
                ...reply,
                message: randomItem(job.replies),
                loading: false,
              }
            : reply,
        ),
      );
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg w-96">
          <Search size={16} className="text-gray-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jobs or companies"
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>
      </div>

      <div className="flex flex-1 p-6 gap-6">
        <div className="flex-1 space-y-4">
          {filteredJobs.map((job) => {
            const originalJobIndex = mockJobs.findIndex(
              (mockJob) =>
                mockJob.title === job.title && mockJob.company === job.company,
            );

            return (
              <div
                key={`${job.company}-${job.title}`}
                className="bg-white rounded-xl shadow p-5 hover:shadow-md transition cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-blue-700">
                  {job.title}
                </h3>

                <p className="text-sm text-gray-600">
                  {job.company} • {job.location}
                </p>

                <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {job.type}
                </span>

                <p className="mt-3 text-sm text-gray-700">{job.description}</p>

                <button
                  type="button"
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg"
                  onClick={() => showReply(originalJobIndex)}
                >
                  Apply
                </button>
              </div>
            );
          })}
        </div>

        <div className="w-72 bg-white rounded-xl shadow p-4 h-fit">
          <h2 className="font-semibold mb-3">Job Insights</h2>

          <div className="flex flex-col gap-3">
            {replies.toReversed().map((reply) => {
              const job = mockJobs[reply.jobIndex];

              return (
                <div
                  key={reply.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 border border-gray-100"
                >
                  <div className="mb-2">
                    <p className="text-base font-semibold text-blue-700">
                      {job.title}
                    </p>
                    <p className="text-sm text-gray-500">{job.company}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <p
                      className={`text-sm leading-relaxed ${
                        reply.loading ? "text-gray-400 italic" : "text-gray-700"
                      }`}
                    >
                      {reply.message}
                    </p>
                  </div>

                  <div className="mt-3 flex justify-between text-xs text-gray-400">
                    <span>{reply.loading ? "Pending" : "Auto-rejected"}</span>
                    <span>• job discussion</span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-sm text-gray-600">
            See how you compare to other applicants and get personalized job
            recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}

