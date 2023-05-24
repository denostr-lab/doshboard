import { JSX } from "preact";
import { HandlerContext } from "$fresh/server.ts";

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
