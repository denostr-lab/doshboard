import { HandlerContext } from "$fresh/server.ts";
import { Data } from "@/@types/data.ts";
import { SingleNumber } from "@/components/SingleNumber.tsx";
import { Activity } from "@/components/Activity.tsx";
import TweetList, { TweetListProps } from "@/islands/TweetList.tsx";

export interface DashboardProps {
  data: Data;
}

export async function requestHandlerDashboard(req: Request, ctx: HandlerContext) {
  const response = await fetch(
    "http://localhost:3000/api/data/get/events",
  );
  let data: Data = {
    eventCount: 0,
    uniquePubkeys: 0,
    events: [],
    utc: {},
    where: [],
    kinds: {},
  };

  if (response.ok) {
    data = await response.json();
  }

  const allTweets = data.events;
  const shortListAmount = 8;
  const longListAmount = Math.min(30, allTweets.length);

  const tweets = allTweets.slice(0, shortListAmount);
  const extendedTweets = allTweets.slice(shortListAmount, longListAmount);

  const allFoundIn = [];
  for (let i = 0; i < allTweets.length; i++) {
    allFoundIn.push(data.where[i].existsIn);
  }
  const foundIn = allFoundIn.slice(0, longListAmount);

  return ctx.render({
    data,
    tweets,
    extendedTweets,
    foundIn,
  });
}

export function Dashboard(
  props: DashboardProps & TweetListProps,
) {
  const { data, tweets, extendedTweets, foundIn } = props;

  return (
    <>
      <div class="m-1 flex-row flex justify-center items-center">
        <div class="flex-1">
          <SingleNumber
            number={182 + data.eventCount}
            label={"TOTAL EVENT COUNT"}
          />
        </div>
        <div class="flex-1 ml-1">
          <SingleNumber
            number={data.eventCount}
            label={"EVENT COUNT 24H"}
          />
        </div>
        <div class="flex-1 ml-1">
          <SingleNumber
            number={79 + data.uniquePubkeys}
            label={"TOTAL UNIQUE PUBKEYS"}
          />
        </div>
        <div class="flex-1 ml-1">
          <SingleNumber
            number={data.uniquePubkeys}
            label={"UNIQUE PUBKEYS 24H"}
          />
        </div>
      </div>
      <div class="pb-1 flex-row flex justify-between items-start">
        <TweetList
          tweets={tweets}
          extendedTweets={extendedTweets}
          foundIn={foundIn}
        />
        <div class="flex mr-1">
          <Activity networkActivity={data.utc} />
        </div>
      </div>
    </>
  );
}
