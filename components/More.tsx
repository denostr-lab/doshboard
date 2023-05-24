import { JSX } from "preact";

interface MoreProps {
  extended: boolean;
  fetching: boolean;
  setExtended: JSX.EventHandler<JSX.TargetedEvent>;
}

export function More(props: MoreProps) {
  if (!props.extended && !props.fetching) {
    return (
      <div class="flex mt-5">
        <div class="flex-1" />
        <div
          class="flex items-center space-x-1 hover:cursor-pointer"
          onClick={props.setExtended}
        >
          <span class="text-stone-500 font-mono tracking-widest">more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5 text-stone-600"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    );
  }

  return null;
}
