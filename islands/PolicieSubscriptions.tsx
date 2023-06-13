import { JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import _ from "underscore";

import {
  EventRateLimit,
  MessageRateLimit,
  RateLimit,
  Settings,
} from "@/@types/settings.ts";
import Input from "@/islands/Input.tsx";
import Button, { Save } from "@/islands/Button.tsx";

interface SettingInfoFormProps {
  data: Settings;
}

interface ListRenderItemProps {
  item: any;
  index: number;
  removeItem: (index: number) => void;
}

interface ListProps {
  name: string;
  placeholder: string;
  type: "number" | "text";
  data: any[];
  renderItem: (props: ListRenderItemProps) => JSX.Element;
}

const isCompare = (a: number, b: number) => a > b ? 1 : -1;

function List(props: ListProps) {
  const { name, placeholder, type = "number", data, renderItem } = props;

  const [dataset, setDataset] = useState<any[]>([...data].sort(isCompare));
  const inputRef = useRef<HTMLInputElement>(null);
  const addDataset = (_: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    const numberValue = Number(inputRef.current?.value);
    if (Number.isSafeInteger(numberValue)) {
      setDataset((prevState) =>
        [...new Set([...prevState, numberValue])].sort(isCompare)
      );
    } else {
      const strValue = (inputRef.current?.value || "").trim();
      setDataset((prevState) =>
        [...new Set([...prevState, strValue])].sort(isCompare)
      );
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const removeItem = (index: number) => {
    setDataset((prevState: number[]) =>
      [...prevState.filter((_, i) => i !== index)].sort(isCompare)
    );
  };

  return (
    <div class="flex flex-row w-3/6">
      <div class="flex flex-col w-full">
        <Input
          class={"w-full"}
          placeholder={placeholder}
          type={type}
          min={0}
          inputRef={inputRef}
        />
        {dataset.length > 0 && (
          <ul>
            {dataset.map((item, index) => (
              <li
                key={item}
                class="border-b-2 border-neutral-100 border-opacity-100 my-2 py-1 px-3 hover:bg-gray-200 dark:border-opacity-50"
              >
                {renderItem({ item, index, removeItem })}
              </li>
            ))}
          </ul>
        )}
        <input
          type="hidden"
          name={name}
          value={`[${dataset.join(",")}]`}
        />
      </div>
      <div class="flex flex-col">
        <Button
          type="button"
          class="ml-2 px-3 py-2 bg-primary rounded border(gray-400 1) hover:bg-gray-200 flex gap-2"
          onClick={addDataset}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

interface RateLimitItemElementProps {
  name: string;
  value?: string | number;
  type?: "text" | "number";
  placeholder: string;
  label: string;
  data?: any[];
}

interface RateLimitItemProps {
  description: RateLimitItemElementProps;
  period: RateLimitItemElementProps;
  rate: RateLimitItemElementProps;
  kinds?: RateLimitItemElementProps;
}

function RateLimitItem(props: RateLimitItemProps) {
  const { description, period, rate, kinds } = props;

  const [kindsData, setKindsData] = useState(kinds?.data || []);

  // (kinds?.data.length > 0) && kinds.data.map((item, index) => {
  //   if (Array.isArray(item)) {
  //     kinds.data[index] = item.join("-");
  //   }
  // })}

  useEffect(() => {
    if (kinds?.data) {
      const data: any[] = [];
      kinds.data.forEach((item, index) => {
        if (Array.isArray(item)) {
          data[index] = item.join("-");
        }
      });
      setKindsData(data);
    }
  }, [kinds]);

  return (
    <>
      <div class="flex justify-start my-2 mt-10">
        <span class="w-48 pr-3 text-sm font-medium text-gray-900 text-right">
          {description.label}
        </span>
        <Input
          placeholder={description.placeholder}
          type={description.type}
          name={description.name}
          value={description.value}
        />
      </div>
      <div class="flex justify-start my-2">
        <span class="w-48 pr-3 text-sm font-medium text-gray-900 text-right">
          {rate.label}
        </span>
        <Input
          placeholder={rate.placeholder}
          type={rate.type}
          name={rate.name}
          value={rate.value}
        />
      </div>
      <div class="flex justify-start my-2">
        <span class="w-48 pr-3 text-sm font-medium text-gray-900 text-right">
          {period.label}
        </span>
        <Input
          placeholder={period.placeholder}
          type={period.type}
          name={period.name}
          value={period.value}
        />
      </div>
      {kinds && kindsData.length !== 0 && (
        <>
          <div class="flex justify-start my-2">
            <span class="w-48 pr-3 text-sm font-medium text-gray-900 text-right">
              kinds number
            </span>
            <Input
              placeholder={kinds.placeholder}
              type={kinds.type}
              name={kinds.name}
              value={kindsData}
            />
            <input
              type="hidden"
              name={kinds.name}
              value={`[${kindsData.join(",")}]`}
            />
          </div>
        </>
      )}
    </>
  );
}

export default function PolicieSubscriptions(props: SettingInfoFormProps) {
  const { data: { limits } } = props;
  const arr: MessageRateLimit[] = [];
  if (limits?.message?.rateLimits?.[0]) {
    arr.push(limits?.message?.rateLimits?.[0]);
  }

  if (limits?.event?.rateLimits) {
    limits?.event?.rateLimits.map((item) => {
      return arr.push(item);
    });
  }

  return (
    <div class="border ml-1 border-stone-300 bg-white">
      <form
        name="limits"
        action="/policies"
        method="POST"
        class="flex flex-col gap-2"
        style={{ width: "60rem" }}
      >
        <div class="flex flex-col mt-5 mb-5">
          <div class="flex justify-start my-2">
            <span class="w-48 pr-3 text-sm font-medium text-gray-900 text-right">
              Max Subscriptions
            </span>
            <Input
              placeholder="Set the maximum REQ of subscription"
              type="number"
              min={0}
              name="limits.client.subscription.maxSubscriptions"
              value={limits?.client?.subscription?.maxSubscriptions || 10}
            />
          </div>
          <div class="flex justify-start my-2">
            <span class="w-48 pr-3 text-sm font-medium text-gray-900 text-right">
              Max Filters
            </span>
            <Input
              placeholder="Set the maximum filter of REQ"
              type="number"
              min={0}
              name="limits.client.subscription.maxFilters"
              value={limits?.client?.subscription?.maxFilters || 10}
            />
          </div>
          <div class="flex justify-start my-2">
            <span class="w-48 pr-3 text-sm font-medium text-gray-900 text-right">
              Max Filter Values
            </span>
            <Input
              placeholder="Set the maximum filter of filters"
              type="number"
              min={0}
              name="limits.client.subscription.maxFilterValues"
              value={limits?.client?.subscription?.maxFilterValues || 2500}
            />
          </div>
          <div class="flex justify-start my-2">
            <span class="w-48 pr-3 text-sm font-medium text-gray-900 text-right">
              Max Limit
            </span>
            <Input
              placeholder="Set the maximum limit number of filter"
              type="number"
              min={0}
              name="limits.client.subscription.maxLimit"
              value={limits?.client?.subscription?.maxLimit || 5000}
            />
          </div>

          <div class="flex justify-start my-2 mt-10">
            <span class="w-48 pr-3 text-sm font-medium text-gray-900 text-right">
              Kind Whitelist
            </span>
            <List
              type={"number"}
              name={"limits.event.kind.whitelist"}
              placeholder={`place input whitelist kind type. ex: 0`}
              data={limits?.event?.kind?.whitelist || []}
              renderItem={(
                { item, index, removeItem }: ListRenderItemProps,
              ) => {
                return (
                  <div class="flex flex-row justify-between">
                    <p>{item}</p>
                    <span onClick={() => removeItem(index)}>delete</span>
                  </div>
                );
              }}
            />
          </div>
          <div class="flex justify-start my-2">
            <span class="w-48 pr-3 text-sm font-medium text-gray-900 text-right">
              Kind Blacklist
            </span>
            <List
              type={"number"}
              name={"limits.event.kind.blacklist"}
              placeholder={`place input blacklist kind type. ex: 0`}
              data={limits?.event?.kind?.blacklist || []}
              renderItem={(
                { item, index, removeItem }: ListRenderItemProps,
              ) => {
                return (
                  <div class="flex flex-row justify-between">
                    <p>{item}</p>
                    <span onClick={() => removeItem(index)}>delete</span>
                  </div>
                );
              }}
            />
          </div>

          {arr.map((obj) => {
            const description: RateLimitItemElementProps = {
              name: "limits.message.rateLimits[0].description",
              value: obj.description,
              type: "text",
              placeholder: "please input message rate limit description",
              label: "rate limit description",
            };

            const rate: RateLimitItemElementProps = {
              name: "limits.message.rateLimits[0].rate",
              value: obj.rate,
              type: "number",
              placeholder: "please input message rate limit rate",
              label: "rate limit rate",
            };

            const period: RateLimitItemElementProps = {
              name: "limits.message.rateLimits[0].period",
              value: obj.period,
              type: "number",
              placeholder: "please input message rate limit period",
              label: "rate limit period",
            };

            const kinds: RateLimitItemElementProps = {
              name: "limits?.event?.rateLimits",
              value: obj?.kinds,
              placeholder: "please input ",
              label: "message rate limit period",
              data: obj?.kinds,
            };
            // console.log("66666", kinds?.data);
            return (
              <RateLimitItem
                description={description}
                rate={rate}
                period={period}
                kinds={kinds}
              />
            );
          })}

          <div class="flex justify-start my-2 mt-10">
            <span class="w-48 pr-3 text-sm font-medium text-gray-900 text-right">
              Pubkey Whitelist
            </span>
            <List
              type={"text"}
              name={"limits.event.pubkey.whitelist"}
              placeholder={`place input whitelist pubkey`}
              data={limits?.event?.pubkey?.whitelist || []}
              renderItem={(
                { item, index, removeItem }: ListRenderItemProps,
              ) => {
                return (
                  <div class="flex flex-row justify-between">
                    <p>{item}</p>
                    <span onClick={() => removeItem(index)}>delete</span>
                  </div>
                );
              }}
            />
          </div>
          <div class="flex justify-start my-2">
            <span class="w-48 pr-3 text-sm font-medium text-gray-900 text-right">
              Pubkey Blacklist
            </span>
            <List
              type={"text"}
              name={"limits.event.pubkey.blacklist"}
              placeholder={`place input pubkey of blacklist`}
              data={limits?.event?.pubkey?.blacklist || []}
              renderItem={(
                { item, index, removeItem }: ListRenderItemProps,
              ) => {
                return (
                  <div class="flex flex-row justify-between">
                    <p>{item}</p>
                    <span onClick={() => removeItem(index)}>delete</span>
                  </div>
                );
              }}
            />
          </div>
          <div class="flex justify-start my-2 mt-5">
            <span class="w-48 text-right"></span>
            <Save />
          </div>
        </div>
      </form>
    </div>
  );
}
