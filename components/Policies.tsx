import { Header } from "@/components/Header.tsx";
import { Settings as ISettings } from "@/@types/settings.ts";
import Input from "@/islands/Input.tsx";
import PolicieSubscriptions from "@/islands/PolicieSubscriptions.tsx"

export interface PoliciesProps {
  data: ISettings;
}

export function Policies(props: PoliciesProps) {
  const { data } = props;

  return (
    <>
      <Header />
      <main class="flex flex-col items-center justify-start w-full">
        <div class="flex flex-col pt-1">
          <div class="overflow-x-hidden">
            <PolicieSubscriptions data={data} />
          </div>
        </div>
      </main>
    </>
  );
}
