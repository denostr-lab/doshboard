import { MiddlewareHandlerContext, Status } from "$fresh/server.ts";
import { cookieSession } from "$fresh_session";
import { State } from "@/session.ts";
import { HTTPClient } from "../utils/http.ts";

export const handler = [
  timing,
  // logging,
  softwareVersion,
  // simpleVerifyAuthorization,
  // sessionHandler,
  setClient,
];

const session = cookieSession({
  maxAge: 60 * 60 * 8, // 8 hours
});

function sessionHandler(req: Request, ctx: MiddlewareHandlerContext<State>) {
  return session(req, ctx);
}

function setClient(_req: Request, ctx: MiddlewareHandlerContext) {
  const { session } = ctx;

  const host = Deno.env.get("RELAY_URL");
  const client = new HTTPClient({ baseURL: host });
  ctx.state.client = client;
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
  res.headers.set("Server", `noshboard/${version};rev=${rev}`);
  return res;
}

async function simpleVerifyAuthorization(
  req: Request,
  ctx: MiddlewareHandlerContext,
): Promise<Response> {
  const url = new URL(req.url);
  if (url.pathname === "/auth" && !req.headers.has("authorization")) {
    return ctx.next();
  }

  if (req.headers.get("authorization") !== Deno.env.get("AUTH_TOKEN")) {
    return new Response("Unauthorized", {
      status: Status.MovedPermanently,
      headers: {
        location: "/auth",
      },
    });
  }
  return ctx.next();
}
