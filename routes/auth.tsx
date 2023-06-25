import { HandlerContext, Handlers, Status } from "$fresh/server.ts";
import { useState } from "preact/hooks";
import { Header } from "@/components/Header.tsx";
import Button from "@/islands/Button.tsx";
import config from "@/config.ts";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: HandlerContext) => {
    return ctx.render(null);
  },
  POST: async (req: Request, ctx: HandlerContext) => {
    const { session } = ctx.state;
    const formData = await req.formData();

    if (config.API_KEY === formData.get("k")) {
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
