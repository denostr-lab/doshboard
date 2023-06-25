import _ from "underscore";
import { HandlerContext, Handlers, Status } from "$fresh/server.ts";

import { HomeProps } from "@/@types/home.ts";
import { Header } from "@/components/Header.tsx";
import { Title } from "@/components/Title.tsx";
import { LinkOut } from "@/components/LinkOut.tsx";
import { hit, hitComponent, routers } from "@/routers.tsx";

export const handler: Handlers = {
  GET: (req: Request, ctx: HandlerContext) => {
    const { session } = ctx.state;
    if (!session?.has("success")) {
      return new Response(null, {
        status: Status.TemporaryRedirect,
        headers: {
          location: "/auth",
        },
      });
    }

    const router = hit(ctx.params);
    if (router?.GET) {
      return router.GET(req, ctx);
    }
    return ctx.render(null);
  },
  POST: (req: Request, ctx: HandlerContext) => {
    const router = hit(ctx.params);
    const { session } = ctx.state;
    if (!session?.has("success")) {
      return new Response(null, {
        status: Status.TemporaryRedirect,
        headers: {
          location: "/auth",
        },
      });
    }
    if (router?.POST) {
      return router.POST(req, ctx);
    }
    return ctx.render(null);
  },
};

export default function Warpper(props: HomeProps) {
  const router = hit(props.params);
  if (!router) {
    return null;
  }

  const randerComponent = hitComponent(props);
  if (!randerComponent) {
    return null;
  }

  return (
    <>
      <Header />
      <div class="flex flex-col mx-auto max-w-6xl py-7">
        <Title />
        <LinkOut />
        <div class="flex items-start">
          <div class="flex-col flex w-52 mt-1 justify-center">
            {routers.filter((router) => !router.exclude).map((router) => (
              <div class={`mb-1 border border-stone-300 w-52 flex justify-center ${router.name === new URL(props.url).pathname.slice(1) ? 'bg-gray-900 text-white' : 'bg-white hover:bg-gray-900 hover:text-white'} `}>
                <a
                  href={"/" + router.name}
                  class="block text-center
                 w-full p-10 pt-2 pb-2"
                >
                  {router.name}
                </a>
              </div>
            ))}
          </div>
          <div class="flex-col flex">
            {randerComponent(props)}
          </div>
        </div>
      </div>
    </>
  );
}
