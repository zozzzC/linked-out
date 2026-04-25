import { useFiredContext } from "../lib/FiredProvider";
import FeedPost from "./FeedPost";

const randomTitles = [
  "Performance Review",
  "Internal Memo",
  "Career Update",
  "Urgent Notice",
  "Official Statement",
  "Feedback Summary",
];

const randomBodies = [
  "After careful consideration, we’ve concluded this person adds absolutely nothing of value.",
  "We appreciate their consistent ability to do the bare minimum.",
  "A bold example of how not to contribute to a team.",
  "Truly inspiring levels of incompetence on display.",
  "We wish them the best in their future… somewhere far away from here.",
  "Their talent for missing deadlines is unmatched.",
  "An industry leader in doing just enough to not get fired… until now.",
  "A masterclass in replying-all to emails unnecessarily.",
  "Consistently present, rarely useful.",
  "A visionary in avoiding responsibility.",
];

function getRandomItem(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

export default function FiredFeed() {
  const { people } = useFiredContext();

  return (
    <div className="flex flex-col gap-4">
      {people.toReversed().map((p, i) => {
        switch (p) {
          case "Dawn Freshwater":
            return (
              <FeedPost
                key={i}
                name={p}
                title="ACTUALLY stupid"
                body="OMG who tf actually fired me!?!??! angela you piece of crap I KNOW youve been sleeping with john don't f with me!"
              />
            );

          case "Sarah":
            return (
              <FeedPost
                key={i}
                name={p}
                title="NO way bro"
                body="imagine thinking youre top dog just cause you got seed funding. i was the real founder. john i KNOW this was you."
              />
            );

          case "Greg":
            return (
              <FeedPost
                key={i}
                name={p}
                title="CALL OUT POST"
                body="im fr calling yall out. none of yall ever do anything worthwhile."
              />
            );

          default:
            return (
              <FeedPost
                key={i}
                name={p}
                title={getRandomItem(randomTitles)}
                body={getRandomItem(randomBodies)}
              />
            );
        }
      })}
    </div>
  );
}
