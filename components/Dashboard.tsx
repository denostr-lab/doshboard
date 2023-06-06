import { HandlerContext } from "$fresh/server.ts";
import { Data, DataIncome } from "@/@types/data.ts";
import { SingleNumber } from "@/components/SingleNumber.tsx";
import { fetchIncome, fetchEvents } from "@/utils/http.ts" ;
import { Activity } from "@/components/Activity.tsx";
import TweetList, { TweetListProps } from "@/islands/TweetList.tsx";

export interface DashboardProps {
  data: Data;
  incomeData: DataIncome;
}

export async function requestHandlerDashboard(req: Request, ctx: HandlerContext) {
  const { client } = ctx.state;
  
  const data = await fetchEvents(client);
  const incomeData = await fetchIncome(client);


  const allTweets = data.events;
  const shortListAmount = 8;
  const longListAmount = Math.min(30, allTweets.length);

  const tweets = allTweets.slice(0, shortListAmount);
  const extendedTweets = allTweets.slice(shortListAmount, longListAmount);

  return ctx.render({
    data,
    incomeData,
    tweets,
    extendedTweets,
  });
}

export function Dashboard(
  props: DashboardProps & TweetListProps,
) {
  const { data, incomeData, tweets, extendedTweets } = props;

  return (
    <>
      <div class="m-1 flex-row flex justify-center items-center">
        <div class="flex-1">
          <SingleNumber
            number={data.eventCount}
            label={"TOTAL EVENT COUNT"}
          />
        </div>
        <div class="flex-1 ml-1">
          <SingleNumber
            number={data.eventCount24Hours}
            label={"EVENT COUNT 24H"}
          />
        </div>
        <div class="flex-1 ml-1">
          <SingleNumber
            number={data.uniquePubkeys}
            label={"TOTAL UNIQUE PUBKEYS"}
          />
        </div>
        <div class="flex-1 ml-1">
          <SingleNumber
            number={data.uniquePubkeys24Hours}
            label={"UNIQUE PUBKEYS 24H"}
          />
        </div>
        
      </div>
      <div class="m-1 flex-row flex justify-center items-center">
      <div class="flex-1 ml-1">
      <div class="p-5 border-1 border-orange-200 bg-white">
      <span class="block text-center pb-1 text-lg text-orange-500 font-bold tracking-tighter">
        TOTAL INCOME
      </span>
      <div class="text-center">
        <span class="text-4xl text-stone-700 tracking-[-0.075em]">
        Satoshi &nbsp;&nbsp; {incomeData.total}
        </span>
      </div>
    </div>
        </div>
        </div>
      <div class="pb-1 flex-row flex justify-between items-start">
        <TweetList
          tweets={tweets}
          extendedTweets={extendedTweets}
        />
        <div class="flex mr-1">
          <Activity networkActivity={data.utc} />
        </div>
      </div>
    </>
  );
}
