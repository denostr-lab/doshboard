import { Range } from "@/@types/base.ts";
import { Event, Kinds } from "@/@types/event.ts";

export type UTC =
  & {
    [x in Range<0, 24>]?: number | string;
  }
  & Record<string, number | string>;

export interface Where {
  id: string;
  existsIn: string[];
}

export interface Data {
  utc: UTC;
  events: Event[];
  where: Where[];
  eventCount: number;
  uniquePubkeys: number;
  kinds: Kinds;
}
