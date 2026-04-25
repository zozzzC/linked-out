"use client";

import { createContext, useContext, useState } from "react";

export type FeedPostType = {
  id: string;
  name: string;
  title: string;
  body: string;
};

type FiredContextType = {
  people: string[];
  feedPosts: FeedPostType[];
  addFeedPost: (post: Omit<FeedPostType, "id">) => void;
  firePerson: (name: string) => void;
};

const FiredContext = createContext<FiredContextType | undefined>(undefined);

function makeId() {
  return `${Date.now()}-${Math.random()}`;
}

function createFiredPost(name: string): FeedPostType {
  return {
    id: makeId(),
    name,
    title: "Performance Review",
    body: "After careful consideration, we’ve concluded this person adds absolutely nothing of value.",
  };
}

export function FiredProvider({ children }: { children: React.ReactNode }) {
  const [people, setPeople] = useState<string[]>([]);
  const [feedPosts, setFeedPosts] = useState<FeedPostType[]>([]);

  function addFeedPost(post: Omit<FeedPostType, "id">) {
    setFeedPosts((currentPosts) => [
      {
        id: makeId(),
        ...post,
      },
      ...currentPosts,
    ]);
  }

  function firePerson(name: string) {
    setPeople((currentPeople) => [...currentPeople, name]);
    setFeedPosts((currentPosts) => [createFiredPost(name), ...currentPosts]);
  }

  return (
    <FiredContext.Provider
      value={{
        people,
        feedPosts,
        addFeedPost,
        firePerson,
      }}
    >
      {children}
    </FiredContext.Provider>
  );
}

export const useFiredContext = () => {
  const firedContext = useContext(FiredContext);

  if (firedContext === undefined) {
    throw new Error("Fired Context must be wrapped in provider");
  }

  return firedContext;
};
