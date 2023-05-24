export type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

export type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export enum EventKinds {
  SET_METADATA = 0,
  TEXT_NOTE = 1,
  RECOMMEND_SERVER = 2,
  CONTACT_LIST = 3,
  ENCRYPTED_DIRECT_MESSAGE = 4,
  DELETE = 5,
  REPOST = 6,
  REACTION = 7,
  // Channels
  CHANNEL_CREATION = 40,
  CHANNEL_METADATA = 41,
  CHANNEL_MESSAGE = 42,
  CHANNEL_HIDE_MESSAGE = 43,
  CHANNEL_MUTE_USER = 44,
  CHANNEL_RESERVED_FIRST = 45,
  CHANNEL_RESERVED_LAST = 49,
  // Encrypted Chanels
  ENCRYPTED_CHANNEL_MEGOLM_SESSION = 104,
  ENCRYPTED_CHANNEL_CREATION = 140,
  ENCRYPTED_CHANNEL_METADATA = 141,
  ENCRYPTED_CHANNEL_MESSAGE = 142,
  // Relay-only
  RELAY_INVITE = 50,
  INVOICE_UPDATE = 402,
  // Lightning zaps
  ZAP_REQUEST = 9734,
  ZAP_RECEIPT = 9735,
  // Replaceable events
  REPLACEABLE_FIRST = 10000,
  REPLACEABLE_LAST = 19999,
  // Ephemeral events
  EPHEMERAL_FIRST = 20000,
  EPHEMERAL_LAST = 29999,
  // Parameterized replaceable events
  PARAMETERIZED_REPLACEABLE_FIRST = 30000,
  PARAMETERIZED_REPLACEABLE_LAST = 39999,
  USER_APPLICATION_FIRST = 40000,
}

export enum EventTags {
  Event = "e",
  Pubkey = "p",
  //  Multicast = 'm',
  Delegation = "delegation",
  Deduplication = "d",
  Expiration = "expiration",
  Invoice = "bolt11",
}

export type EventId = string;
export type Pubkey = string;
export type Secret = string
export type TagName = EventTags | string;
export type Tag = TagBase & string[];
export type ExtraTagValues = {
  [index in Range<2, 100>]?: string;
};
export interface TagBase extends ExtraTagValues {
  0: TagName;
  1: string;
}

export enum MessageType {
  REQ = 'REQ',
  EVENT = 'EVENT',
  CLOSE = 'CLOSE',
  NOTICE = 'NOTICE',
  EOSE = 'EOSE',
  OK = 'OK',
}

export type SubscriptionId = string

export interface SubscriptionFilter {
    ids?: EventId[]
    kinds?: EventKinds[]
    since?: number
    until?: number
    authors?: Pubkey[]
    limit?: number
    [key: `#${string}`]: string[]
}
