import { EventKinds, EventId, Pubkey, Tag } from "@/@types/base.ts";

export type Kinds = {
  [index in EventKinds]?: number;
};

export interface BaseEvent {
    id: EventId
    pubkey: Pubkey
    created_at: number
    kind: EventKinds
    tags: Tag[]
    sig: string
    content: string
}

export type Event = BaseEvent;
