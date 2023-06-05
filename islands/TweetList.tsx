import { useSignal } from "@preact/signals";

import { Event } from "@/@types/event.ts";
import { Loading } from "@/components/Loading.tsx";
import { More } from "@/components/More.tsx";
import { Fetching } from "@/components/Fetching.tsx";
import { Tweet } from "@/components/Tweet.tsx";
import LatestTweetList from "@/islands/LatestTweetList.tsx";

export interface TweetListProps {
  tweets: Event[];
  extendedTweets: Event[];
  foundIn: any[];
}

export default function TweetList(props: TweetListProps) {
  const tweets = useSignal(props.tweets || []);
  const foundIn = useSignal(props.foundIn || []);
  const extendedTweets = useSignal(props.extendedTweets || []);

  const extended = useSignal(false);
  const fetching = useSignal(false);

  const getRecentEvents = async () => {
    extended.value = false;
    fetching.value = true;

    tweets.value = [];
    extendedTweets.value = [];

    const host = Deno.env.get('RELAY_URL')
    const url = new URL("/api/metrics/events", host)
    
    const response = await fetch(url.toString())
      .then((r) => r.json());
    const body = response.body;

    fetching.value = false;

    tweets.value = body.events.slice(0, 8);
    extendedTweets.value = body.events;
  };

  return (
    <div
      class="flex-col flex-1 flex p-5 ml-1 mr-1 border-1 border-orange-200 bg-white xl:max-w-lg xl:basis-1/2"
      style={{ width: 490 }}
    >
      <div class="flex items-center">
        <div class="flex-1" />
        <span class="block text-center text-lg text-orange-500 font-bold tracking-tighter">
          LATEST EVENTS
        </span>
        <div class="flex-1 flex">
          <div class="flex-1" />
          {fetching.valueOf()
            ? <Loading />
            : <LatestTweetList getRecentEvents={getRecentEvents} />}
        </div>
      </div>

      {tweets && (
        <>
          <div class="flex flex-col">
            {tweets.value.map((tweet, tweetIndex) => (
              <Tweet
                time={tweet.created_at}
                message={tweet.content}
                pubkey={tweet.pubkey}
                foundIn={foundIn.value[tweetIndex]}
              />
            ))}
          </div>
          {extended.valueOf() && (
            <div class="flex flex-col">
              {extendedTweets.value.map((tweet, tweetIndex) => (
                <Tweet
                  time={tweet.created_at}
                  message={tweet.content}
                  pubkey={tweet.pubkey}
                  foundIn={foundIn.value[tweetIndex]}
                />
              ))}
            </div>
          )}
        </>
      )}

      <Fetching fetching={fetching.valueOf()} />
      <More
        fetching={fetching.valueOf()}
        extended={extended.valueOf()}
        setExtended={() => {
          extended.value = !extended.valueOf();
        }}
      />
    </div>
  );
}
