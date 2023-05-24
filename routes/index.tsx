import { HandlerContext, Handlers, Status } from "$fresh/server.ts";
import _ from "underscore";

export const handler: Handlers = {
  GET: (_, ctx: HandlerContext) => {
    // const { session } = ctx.state;

    // console.log('-------- ############### ---------', session?.get('success'))
    // if (!session?.get('success')) {
    //   return new Response(null, {
    //     status: Status.TemporaryRedirect,
    //     headers: {
    //       location: "/auth",
    //     },
    //   });
    // }

    return new Response(null, {
      status: Status.TemporaryRedirect,
      headers: {
        location: "/auth",
      },
    });
  },
};
