import { Data, DataIncome } from "@/@types/data.ts";

interface FetchOptions {
  output?: "json" | "raw" | "text";
  interceptor?: boolean;
  timeout?: number;
  debug?: boolean;
  client?: Deno.HttpClient;
  proxyURL?: string;
}

export class HTTPClient {
  private config: {
    baseURL?: string;
    headers?: any;
    timeout?: number;
  };

  constructor(
    config?: { baseURL?: string; headers?: Record<any, any> },
    private proxyClient?: Deno.HttpClient,
  ) {
    this.config = {
      baseURL: config?.baseURL,
      headers: {
        ...config?.headers,
      },
    };
  }

  private baseURL(url: string) {
    return new URL(url, this.config?.baseURL).toString();
  }

  private async do(
    url: string,
    init: RequestInit & FetchOptions,
  ): Promise<Response | string | any> {
    const {
      method = "GET",
      body,
      headers = {},
      output = "json",
      interceptor = true,
      timeout = 30000, // timeout 30s
      debug = false, // show response content
      proxyURL,
    } = init || {};
    let { client: proxyClient } = init || {};

    // timeout handle
    const ac = new AbortController();
    const timeouttimer = setTimeout(
      () => ac.abort(`HTTP Request Timeout exceed ${timeout}ms`),
      timeout,
    );
    const options: RequestInit & { client?: Deno.HttpClient } = {
      method,
      headers: {
        ...this.config.headers,
        ...headers,
      },
      body,
      signal: ac.signal,
    };

    // use proxy agent.  proxyClient > proxyURL > this.proxyCient
    if (proxyURL && !proxyClient) {
      proxyClient = Deno.createHttpClient({
        proxy: {
          url: proxyURL,
        },
      });
    }
    proxyClient = proxyClient || this.proxyClient;
    if (proxyClient) {
      options.client = proxyClient;
      options.keepalive = true;
    }

    const response = await fetch(this.baseURL(url), options);
    clearTimeout(timeouttimer);

    if (!response.ok && interceptor) {
      if (debug) {
        console.log("HTTP Request Response:", await response.text());
      }
      throw new Error(`HTTP Request faild status: ${response.status}`);
    }

    if (output === "raw") {
      return response;
    }

    if (output !== "json") {
      return response.text();
    }

    return response.json();
  }

  async get(url: string, init?: RequestInit & FetchOptions) {
    return {
      data: await this.do(url, {
        method: "GET",
        ...init,
      }),
    };
  }

  async post(
    url: string,
    body: Record<any, any>,
    init?: RequestInit & FetchOptions,
  ) {
    return {
      data: await this.do(url, {
        method: "POST",
        ...init,
        body: JSON.stringify(body),
        redirect: "follow",
      }),
    };
  }

  useProxy(client: string | Deno.HttpClient) {
    if (typeof client === "string") {
      this.proxyClient = Deno.createHttpClient({
        proxy: {
          url: client,
        },
      });
    } else {
      this.proxyClient = client;
    }
  }
}

export const fetchEvents = async (client: HTTPClient) => {
  const data: { data: Data } = await client.get("/api/metrics/events", {
    interceptor: false,
    output: "json",
  });

  if (!data.data) {
    return {
      eventCount: 0,
      uniquePubkeys: 0,
      events: [],
      utc: {},
      where: [],
      kinds: {},
    };
  }

  return data.data;
};

export const fetchIncome = async (client: HTTPClient) => {
  const data: { data: DataIncome } = await client.get(
    "/api/metrics/order/amount",
    {
      interceptor: false,
      output: "json",
    },
  );

  if (!data.data) {
    return {
      total: 0,
    };
  }

  return data.data;
};
