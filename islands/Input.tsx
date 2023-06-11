import { JSX, Ref } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function Input(
  props: JSX.HTMLAttributes<HTMLInputElement> & {
    inputRef?: Ref<HTMLInputElement>;
  },
) {
  return (
    <input
      ref={props.inputRef}
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={`${
        !props.class ? "w-3/6" : ""
      } px-3 py-2 bg-white rounded border(gray-500 2) disabled:(opacity-50 cursor-not-allowed) ${
        props.class ?? ""
      }`}
    />
  );
}
