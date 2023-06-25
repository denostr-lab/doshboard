import { JSX } from "preact";
import { asset, Head } from "$fresh/runtime.ts";
// import { IS_BROWSER } from "$fresh/runtime.ts";

export function Header(_: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <Head>
      <title>doshboard</title>
      <meta charSet="utf-8" />
      <meta name="description" content="a Nostr relays dashboard" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/tw-elements/dist/css/tw-elements.min.css"
      />
      <script src="https://cdn.tailwindcss.com/3.3.0"></script>
      {/* <script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/tw-elements.umd.min.js"></script> */}
      <link rel="stylesheet" href={asset("/global.css")} />
    </Head>
  );
}
