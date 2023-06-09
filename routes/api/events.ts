import { HandlerContext, Handlers, Status } from "$fresh/server.ts";
import { fetchEvents } from "@/utils/http.ts";
import { State } from "@/@types/router.ts";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: HandlerContext) => {
    const { client } = ctx.state as State;
    const body = await fetchEvents(client);
    return Response.json(body);
  },
};
