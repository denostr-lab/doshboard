import { HandlerContext, Handlers, Status } from "$fresh/server.ts";
import { fetchEvents } from "@/utils/http.ts";
import { State } from "@/@types/router.ts";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: HandlerContext) => {
    
    const { client,session } = ctx.state as State;
    if(session?.get?.("success")){
      const body = await fetchEvents(client);
      return Response.json(body);
    }else{
      return new Response(null, {
        status: Status.TemporaryRedirect,
        headers: {
          location:  "/auth",
        },
      });
    }

    
  },
};
