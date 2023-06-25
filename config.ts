const key = Deno.env.get("API_KEY") || "";
Deno.env.set("APP_KEY", key);

export default {
  PORT: (() => {
    const port = Number(Deno.env.get("PORT"));
    return Number.isSafeInteger(port) ? port : 8088;
  })(),
  API_KEY: key,
  RELAY_URL: Deno.env.get("RELAY_URL") || "",
};
