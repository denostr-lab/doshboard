import { PageProps } from "$fresh/server.ts";
import { Data } from "@/@types/data.ts";

export interface HomeParams {
  page: string;
}

export interface PropsData {
  data: Data;
  tweets: any[];
  extendedTweets: any[];
  foundIn: any[];
}

export type HomeProps = {
  params: Record<string, string>;
} & PageProps<PropsData>;
