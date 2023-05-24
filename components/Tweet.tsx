import { format } from 'timeago'

interface TweetProps {
    pubkey: string;
    message: string;
    time: number;
    foundIn: string[];
}

export function Tweet(props: TweetProps) {
    const { pubkey, message, time, foundIn } = props;
    return (
        <div class="mt-5">
          <div class="flex justify-between">
            <span class="text-stone-600 font-semibold">{pubkey.slice(0, 5) + "..." + pubkey.slice(-5)}</span>
            <span class="text-stone-400">{format(time * 1000)}</span>
          </div>
          <p class="break-words text-stone-500 mb-1 max-w-md">
            {message}
          </p>
          {
            foundIn && (
              <div class="flex text-sm flex-wrap">
                {foundIn.map((place) => {
                  return (
                    <span class="border mr-0.5 mb-0.5 border-stone-300 rounded-full px-1.5 text-stone-500">{place}</span>
                  )
                })}
              </div>
            )
          }
        </div>
    );
}
