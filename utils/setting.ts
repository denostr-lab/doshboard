import { HandlerContext, Status } from "$fresh/server.ts";
import { Settings } from "@/@types/settings.ts";
import { HTTPClient } from "@/utils/http.ts";
import { State } from "../@types/router.ts";

export const fetchSettings = async (client: HTTPClient) => {
  return await client.get(
    "/api/metrics/settings",
  );
};

function replaceValue(data: any, keys: string[], value: any): any {
  let key = keys[0];
  const isArrayKey = /(.*?)\b\[(.)\]/.test(key);
  if (isArrayKey) {
    const matchs = key.match(/(.*?)\b\[(.)\]/);
    if (matchs?.length && matchs.length > 1) {
      key = matchs[1];
      data = data[key];
      key = matchs[2];
    }
  }

  if (keys.length === 1) {
    data[key] = value;
    return;
  }

  return replaceValue(data[key], [...keys.slice(1)], value);
}

export const submitSettings = async (req: Request, ctx: HandlerContext) => {
  const { client } = ctx.state as State;
  const data = await fetchSettings(client as HTTPClient);

  if (Object.keys(data.data).length === 0) {
    return new Response(null, {
      status: Status.InternalServerError,
    });
  }

  const formData = await req.formData();
  for (let [key, value] of formData) {
    const keys = key.split(".").filter(Boolean);
    if (keys.length === 0) {
      continue;
    }
    if (["true", "false"].includes(value.toString())) {
      value = "true" === value.toString();
    } else {
      const numberValue = Number(value.toString());
      if (Number.isSafeInteger(numberValue)) {
        value = numberValue;
      }
    }
    replaceValue(data.data, keys, value);
  }

  const res = await client.post('/api/metrics/settings', data.data );

  if(!res?.body?.get('ok')){
    new Response('setting is not save', {
      status: Status.InternalServerError,
    });
  }

  return ctx.render(data);
};
