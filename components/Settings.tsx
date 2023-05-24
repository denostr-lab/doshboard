import { Header } from "@/components/Header.tsx";
import SettingInfoForm from "@/islands/SettingInfoForm.tsx";
import SettingPaymentsForm from "@/islands/SettingPaymentsForm.tsx";
import { Settings as ISettings } from "@/@types/settings.ts";

export interface SettingsProps {
  data: ISettings;
}

export function Settings(props: SettingsProps) {
  const { data } = props;

  return (
    <>
      <Header />
      <main class="flex flex-col items-center justify-start w-full">
        <div class="flex flex-col pt-1">
          <div class="overflow-x-hidden">
            <SettingInfoForm data={data} />
            <div class="my-2"></div>
            <SettingPaymentsForm data={data} />
            <div class="my-2"></div>
          </div>
        </div>
      </main>
    </>
  );
}
