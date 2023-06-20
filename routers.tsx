import { HandlerContext } from "$fresh/server.ts";
import { Router, State } from "@/@types/router.ts";

import { HomeProps } from "@/@types/home.ts";
import { Dashboard, requestHandlerDashboard } from "@/components/Dashboard.tsx";
import { Settings } from "@/components/Settings.tsx"
import { Policies } from "@/components/Policies.tsx"
import { fetchSettings, submitSettings } from "@/utils/setting.ts"
import InvoicesList from "@/islands/InvoicesList.tsx";
import { fetchInvoiceList } from "@/utils/http.ts";

export const routers: Router[] = [
  {
    name: "dashboard",
    exclude: false,
    Component: Dashboard,
    GET: (req: Request, ctx: HandlerContext) => {
      return requestHandlerDashboard(req, ctx);
    },
    POST: (req: Request, ctx: HandlerContext) => {
      return requestHandlerDashboard(req, ctx);
    },
  },
  {
    name: "policies",
    exclude: false,
    Component: Policies,
    GET: async (_req: Request, ctx: HandlerContext) => {
      const { client } = ctx.state as State
      const data = await fetchSettings(client);
      return ctx.render(data);
    },
    POST: (req: Request, ctx: HandlerContext) => {
      return submitSettings(req, ctx);
    }
  },
  {
    name: "invoiceslist",
    exclude: false,
    Component: InvoicesList,
    GET: async (req: Request, ctx: HandlerContext) => {
      const url = new URL(req.url)
      
      const { client } = ctx.state as State
      const data = await fetchInvoiceList(client, url.searchParams);

      return ctx.render({
        ...data,
        pubkeyOrId: url.searchParams.get('pubkeyOrId') || '',
      });
    },
    // POST: (req: Request, ctx: HandlerContext) => {
    //   return submitSettings(req, ctx);
    // }
  },
  {
    name: "settings",
    exclude: false,
    Component: Settings,
    GET: async (_req: Request, ctx: HandlerContext) => {
      const { client } = ctx.state as State
      const data = await fetchSettings(client);
      return ctx.render(data);
    },
    POST: (req: Request, ctx: HandlerContext) => {
      return submitSettings(req, ctx);
    }
  },
];


export function hit(params: Record<string, string>) {
  const page = String(params.page).trim();
  return routers.find((r) => r.name === page);
}

export function hitComponent(props: HomeProps) {
  const router = hit(props.params);
  if (!router) {
    return null;
  }

  const { name, Component } = router;
  return (props: HomeProps) => <Component {...props.data} name={name} />;
}
