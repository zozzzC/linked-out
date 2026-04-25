import { useFiredContext } from "../lib/FiredProvider";
import FeedPost from "./FeedPost";

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
            break;
          case "Sarah":
            return (
              <FeedPost
                key={i}
                name={p}
                title="NO way bro"
                body="imagine thinking youre top dog just cause you got seed funding. i was the real founder. john i KNOW this was you."
              />
            );
            break;
          case "Greg":
            return (
              <FeedPost
                key={i}
                name={p}
                title="CALL OUT POST"
                body="im fr calling yall out. none of yall ever do anything worthwhile."
              />
            );
            break;
          default:
            break;
        }
      })}
    </div>
  );
}
