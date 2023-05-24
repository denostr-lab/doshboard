import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import IconDeviceFloppy from "icons/device-floppy.tsx";

export default function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={`px-3 py-2 bg-white rounded border(gray-500 2) hover:bg-gray-200 active:bg-gray-300 disabled:(opacity-50 cursor-not-allowed) ${
        props.class ?? ""
      }`}
    />
  );
}

export function Save(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      class="px-3 py-2 bg-white rounded border(gray-400 1) hover:bg-gray-200 flex gap-2"
    >
      <IconDeviceFloppy class="w-6 h-6" />Save
    </button>
  );
}
