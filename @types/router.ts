import { JSX } from "preact";
import { HandlerContext } from "$fresh/server.ts";
import { HTTPClient } from "@/utils/http.ts";
import { WithSession } from "@/session.ts";

export type HTTPMethod = (
  req: Request,
  ctx: HandlerContext,
) => Response | Promise<Response>;

export interface Router {
  name: string;
  exclude: boolean;
  Component: (props: any) => JSX.Element;
  GET?: HTTPMethod;
  POST?: HTTPMethod;
}

export type State = { client: HTTPClient } & WithSession;
