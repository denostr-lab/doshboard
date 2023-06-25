import { MiddlewareHandlerContext, Status } from "$fresh/server.ts";
import { cookieSession } from "$fresh_session";
import { State } from "@/@types/router.ts";
import { HTTPClient } from "@/utils/http.ts";
import config from "@/config.ts";

export const handler = [
  timing,
  logging,
  softwareVersion,
  sessionHandler,
  initHTTPClient,
];

const session = cookieSession({
  maxAge: 60 * 60 * 8, // 8 hours
});

function sessionHandler(req: Request, ctx: MiddlewareHandlerContext<State>) {
  return session(req, ctx);
}

function initHTTPClient(_req: Request, ctx: MiddlewareHandlerContext) {
  if (!config.RELAY_URL) {
    return new Response('Please set environment variables "RELAY_URL"', {
      status: Status.BadGateway,
    });
  }

  if (!config.API_KEY) {
    return new Response('Please set environment variables "API_KEY"', {
      status: Status.BadGateway,
    });
  }

  ctx.state.client = new HTTPClient({
    baseURL: config.RELAY_URL,
    headers: { "x-api-key": config.API_KEY },
  });
  return ctx.next();
}

async function timing(
  _req: Request,
  ctx: MiddlewareHandlerContext,
): Promise<Response> {
  const start = performance.now();
  const res = await ctx.next();
  const end = performance.now();
  const dur = (end - start).toFixed(1);
  res.headers.set("Server-Timing", `handler;dur=${dur}`);
  return res;
}

async function logging(
  req: Request,
  ctx: MiddlewareHandlerContext,
): Promise<Response> {
  const res = await ctx.next();
  console.log(`${req.method} ${req.url} ${res.status}`);
  return res;
}

async function softwareVersion(
  _req: Request,
  ctx: MiddlewareHandlerContext,
) {
  const rev = Deno.env.get("APP_REV") || "0000000";
  const version = Deno.env.get("APP_VERSION") || "0.0.0";
  const res = await ctx.next();
  res.headers.set("Server", `doshboard/${version};rev=${rev}`);
  return res;
}
