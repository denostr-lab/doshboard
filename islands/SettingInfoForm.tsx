import { Settings } from "@/@types/settings.ts";
import Input from "@/islands/Input.tsx";
import { Save } from "@/islands/Button.tsx";

interface SettingInfoFormProps {
  data: Settings;
}

export default function SettingInfoForm(props: SettingInfoFormProps) {
  const { data: { info } } = props;

  return (
    <div class="border ml-1 border-stone-300 bg-white">
      <form
        name="info"
        action="/settings"
        method="POST"
        class="flex flex-col gap-2"
        style={{ width: "60rem" }}
      >
        <div class="flex flex-col mt-5 mb-5">
          <div class="flex justify-start my-2">
            <span class="w-32 pr-3 text-sm font-medium text-gray-900 text-right">
              Relay URL
            </span>
            <Input
              placeholder="wss://relay.example.com"
              type="text"
              name="info.relay_url"
              value={info.relay_url}
            />
          </div>
          <div class="flex justify-start my-2">
            <span class="w-32 pr-3 text-sm font-medium text-gray-900 text-right">
              Name
            </span>
            <Input
              placeholder="nostr relay by denostr"
              type="text"
              name="info.name"
              value={info.name}
            />
          </div>
          <div class="flex justify-start my-2">
            <span class="w-32 pr-3 text-sm font-medium text-gray-900 text-right">
              Description
            </span>
            <Input
              placeholder="Deno-based, cloud-native nostr implementation supported by ByteTrade and Revo, forked from nostream."
              type="text"
              name="info.description"
              value={info.description}
            />
          </div>
          <div class="flex justify-start my-2">
            <span class="w-32 pr-3 text-sm font-medium text-gray-900 text-right">
              Pubkey
            </span>
            <Input
              placeholder="Enter your pubkey-hex here"
              type="text"
              name="info.pubkey"
              value={info.pubkey}
            />
          </div>
          <div class="flex justify-start my-2">
            <span class="w-32 pr-3 text-sm font-medium text-gray-900 text-right">
              Contact
            </span>
            <Input
              placeholder="mailto:admin@relay.example.com"
              type="text"
              name="info.contact"
              value={info.contact}
            />
          </div>
          <div class="flex justify-start my-2 mt-5">
            <span class="w-32 text-right"></span>
            <Save />
          </div>
        </div>
      </form>
    </div>
  );
}
