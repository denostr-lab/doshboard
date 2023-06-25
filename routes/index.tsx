import { HandlerContext, Handlers, Status } from "$fresh/server.ts";
import _ from "underscore";
import { State } from "@/@types/router.ts";

export const handler: Handlers = {
  GET: (_, ctx: HandlerContext) => {
    const { session } = ctx.state as State;

    return new Response(null, {
      status: Status.TemporaryRedirect,
      headers: {
        location: !session?.get?.("success") ? "/auth" : "/dashboard",
      },
    });
  },
};
