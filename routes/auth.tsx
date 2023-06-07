import { HandlerContext, Handlers, Status } from "$fresh/server.ts";
import { WithSession } from "$fresh_session";
import { useEffect, useState } from "preact/hooks";

import { HomeProps } from "@/@types/home.ts";
import { Header } from "@/components/Header.tsx";
import { Title } from "@/components/Title.tsx";
import Button from "@/islands/Button.tsx";

export const handler: Handlers = {
  GET: (_req: Request, ctx: HandlerContext) => {
    // return new Response(null, {
    //   status: Status.TemporaryRedirect,
    //   headers: {
    //     location: "/dashboard",
    //   },
    // });
    return ctx.render(null);
  },
  POST: async (req: Request, ctx: HandlerContext) => {
    const { session } = ctx.state;
    const formData = await req.formData();

    if (Deno.env.get("APP_KEY") === formData.get("k")) {
      session.set("success", "ok");
    }

    return new Response(null, {
      status: Status.MovedPermanently,
      headers: {
        "location": "/dashboard",
      },
    });
  },
};

export default function Auth(props: any) {
  const [query, setQuery] = useState("");
  const [pressToggle, setPressToggle] = useState(false);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setPressToggle(!pressToggle);
    }
  };

  return (
    <>
      <Header />
      <main class="flex flex-col items-center justify-start my-10 w-full">
        <div class="flex flex-col items-center justify-start md:(w-1/2) w-4/5">
          <form action="/auth" method="POST">
            <input
              type="text"
              name="k"
              placeholder="place input app key"
              value={query ? query : ""}
              onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
              onKeyPress={(e) => handleKeyPress(e)}
              class="p-2 w-full border-2 border-yellow-300 rounded-md text-lg mt-4 text-center duration-300 focus:(outline-none border-yellow-400)"
            />
            <Button
              onClick={() => setPressToggle(!pressToggle)}
              class="bg-yellow-300 py-2 px-4 rounded-md duration-300 shadow-md text-lg mt-4 hover:(shadow-lg) focus:(shadow-lg outline-none)"
            >
              Submit
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
