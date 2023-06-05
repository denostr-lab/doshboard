import { format } from 'timeago'

interface TweetProps {
    pubkey: string;
    message: string;
    time: number;
}

export function Tweet(props: TweetProps) {
    const { pubkey, message, time } = props;
    return (
        <div class="mt-5">
          <div class="flex justify-between">
            <span class="text-stone-600 font-semibold">{pubkey.slice(0, 5) + "..." + pubkey.slice(-5)}</span>
            <span class="text-stone-400">{format(time * 1000)}</span>
          </div>
          <p class="break-words text-stone-500 mb-1 max-w-md">
            {message}
          </p>
        </div>
    );
}
