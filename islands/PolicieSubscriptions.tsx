import { JSX, options } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import _ from "underscore";

import {
  EventRateLimit,
  MessageRateLimit,
  RateLimit,
  Settings,
  EventLimits,
  MessageLimits,
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
      if (strValue.length === 64) {
        setDataset((prevState) =>
          [...new Set([...prevState, strValue])].sort(isCompare)
        );
      }else{
        alert("length must be 64 characters")
      }
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
      setKindsData(kinds?.data);
    }
  }, [kinds]);

  const _onChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    // console.log('value --->', e.currentTarget.value);
    if (e.currentTarget.value) {
      const items = e.currentTarget.value.split(',');
      const newItems = items.map(item => {
        if (Number.isSafeInteger(Number(item))) {
          return item;
        } else {
          const [a, b] = item.split("-");
          if(Number.isSafeInteger(Number(a)) && Number.isSafeInteger(Number(b)) ) {
            if(a<b){
              return [a, b];
            }else{
              alert('please enter into correct number')
            }
          }else{
            alert('please enter into correct number')
          }
        }
      })
      setKindsData([...newItems]);
    }

    // setKindsData([...kindsData]);
  }

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
              type="text"
              value={kindsData.map(item => Array.isArray(item) ? item.join('-') : item)}
              onChange={_onChange}
            />
            <input
              type="hidden"
              name={kinds.name}
              value={`[${kindsData.map(item => Array.isArray(item) ? `[${item}]` : item)}]`}
            />
          </div>
        </>
      )}
    </>
  );
}

export default function PolicieSubscriptions(props: SettingInfoFormProps) {
  const { data: { limits } } = props;

  const renderRateLimit = (key: 'event' | 'message' | string) => {
    if (!limits) {
      return null;
    }
    const newLimits = limits[key] as EventLimits | MessageLimits;

    return newLimits.rateLimits?.map((item, index) => {
      const description: RateLimitItemElementProps = {
        name: `limits.${key}.rateLimits[${index}].description`,
        value: item.description,
        type: "text",
        placeholder: "please input message rate limit description",
        label: "rate limit description",
      };
  
      const rate: RateLimitItemElementProps = {
        name: `limits.${key}.rateLimits[${index}].rate`,
        value: item.rate,
        type: "number",
        placeholder: "please input message rate limit rate",
        label: "rate limit rate",
      };
  
      const period: RateLimitItemElementProps = {
        name: `limits.${key}.rateLimits[${index}].period`,
        value: item.period,
        type: "number",
        placeholder: "please input message rate limit period",
        label: "rate limit period",
      };
  
      const kinds: RateLimitItemElementProps = {
        name: `limits.${key}.rateLimits[${index}].kinds`,
        value: item?.kinds,
        placeholder: "please input ",
        label: "message rate limit period",
        data: item?.kinds,
      };

      return (
        <RateLimitItem
          description={description}
          rate={rate}
          period={period}
          kinds={kinds}
        />
      );
    })
    
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


          {['event', 'message'].map((key) => renderRateLimit(key))}

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
                    <p>{item.slice(0, 15) + "..." + item.slice(-15)}</p>
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
                // console.log('223344',item)
                return (
                  <div class="flex flex-row justify-between">
                    <p>{item.slice(0, 15) + "..." + item.slice(-15)}</p>
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
