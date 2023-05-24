import { useRef, useState } from "preact/hooks";

import Input from "@/islands/Input.tsx";
import { PaymentsProcessors, Settings } from "@/@types/settings.ts";
import { Save } from "@/islands/Button.tsx";

export interface SettingInfoFormProps {
  data: Settings;
}

export default function SettingPaymentsForm(props: SettingInfoFormProps) {
  const { data: { payments, paymentsProcessors, limits } } = props;
  const [paidEnabled, setPaidEnabled] = useState<boolean>(
    payments?.enabled || false,
  );
  const [admissionEnabled, setAdmissionEnabled] = useState<boolean>(
    payments?.feeSchedules?.admission?.[0]?.enabled || false,
  );
  const [paymentType, setPaymentType] = useState<
    keyof PaymentsProcessors | "disable"
  >(payments?.processor || "disable");

  const minBalance = useRef<bigint>(limits?.event?.pubkey?.minBalance || 0n);

  return (
    <div class="border ml-1 border-stone-300 bg-white">
      <form
        name="payments"
        action="/settings"
        method="POST"
        class="flex flex-col gap-2"
        style={{ width: "60rem" }}
      >
        <div class="flex justify-start my-2 mt-5">
          <span class="w-32 pr-3 text-sm font-medium text-gray-900 text-right">
            Paid
          </span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="hidden"
              name="payments.enabled"
              value={paidEnabled ? "true" : "false"}
            />
            <input
              type="checkbox"
              checked={paidEnabled}
              class="sr-only peer"
              onClick={() => {
                setPaidEnabled(!paidEnabled);
              }}
            />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
            </div>
          </label>
        </div>

        {paidEnabled && (
          <>
            <div class="flex flex-col mt-2">
              <div class="flex justify-start my-2">
                <label
                  for="payment-types"
                  class="w-32 mb-2 pr-3 text-sm font-medium text-gray-900 text-right"
                >
                  Payments
                </label>
                <select
                  id="payment-types"
                  class="w-3/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  name="payments.processor"
                  onChange={(e) => {
                    if (e?.target?.value) {
                      setPaymentType(e.target.value);
                    }
                  }}
                >
                  <option>Disabled</option>
                  <option
                    value="lnbits"
                    {...(payments?.processor === "lnbits") &&
                      { selected: true }}
                  >
                    LNbits
                  </option>
                  <option
                    value="lnurl"
                    {...(payments?.processor === "lnurl") &&
                      { selected: true }}
                  >
                    LNURL
                  </option>
                  <option
                    value="zebedee"
                    {...(payments?.processor === "zebedee") &&
                      { selected: true }}
                  >
                    Zebedee
                  </option>
                </select>
              </div>
            </div>

            {paymentType === "lnbits" && (
              <>
                <div class="flex justify-start my-2">
                  <span class="w-32 pr-3 text-sm font-medium text-gray-900 text-right">
                    LNbits URL
                  </span>
                  <Input
                    name="paymentsProcessors.lnbits.baseURL"
                    value={paymentsProcessors?.lnbits?.baseURL || ""}
                  />
                </div>
                <div class="flex justify-start my-2">
                  <span class="w-32 pr-3 text-sm font-medium text-gray-900 text-right">
                    Callback URL
                  </span>
                  <Input
                    name="paymentsProcessors.lnbits.callbackBaseURL"
                    value={paymentsProcessors?.lnbits?.callbackBaseURL || ""}
                  />
                </div>
              </>
            )}

            {paymentType === "lnurl" && (
              <>
                <div class="flex justify-start my-2">
                  <span class="w-32 pr-3 text-sm font-medium text-gray-900 text-right">
                    Invoice URL
                  </span>
                  <Input
                    name="paymentsProcessors.lnurl.invoiceURL"
                    value={paymentsProcessors?.lnurl?.invoiceURL || ""}
                  />
                </div>
              </>
            )}

            {paymentType === "zebedee" && (
              <>
                <div class="flex justify-start my-2">
                  <span class="w-32 pr-3 text-sm font-medium text-gray-900 text-right">
                    ZBD URL
                  </span>
                  <Input
                    name="paymentsProcessors.zebedee.baseURL"
                    value={paymentsProcessors?.zebedee?.baseURL || ""}
                  />
                </div>
                <div class="flex justify-start my-2">
                  <span class="w-32 pr-3 text-sm font-medium text-gray-900 text-right">
                    Callback URL
                  </span>
                  <Input
                    name="paymentsProcessors.zebedee.callbackBaseURL"
                    value={paymentsProcessors?.zebedee?.callbackBaseURL || ""}
                  />
                </div>
              </>
            )}
          </>
        )}

        <div class="flex justify-start mt-10">
          <span class="w-32 pr-3 text-sm font-medium text-gray-900 text-right">
            Fee Schedules
          </span>
        </div>
        <div class="flex justify-start mt-2">
          <span class="w-32 pr-3 text-sm font-medium text-gray-900 text-right">
            Admission
          </span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="hidden"
              name="payments.feeSchedules.admission[0].enabled"
              value={admissionEnabled ? "true" : "false"}
            />
            <input
              type="checkbox"
              checked={admissionEnabled}
              class="sr-only peer"
              onClick={() => {
                setAdmissionEnabled(!admissionEnabled);
              }}
            />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
            </div>
          </label>
        </div>

        {admissionEnabled && (
          <>
            <div class="flex justify-start my-2">
              <span class="w-32 pr-3 text-sm font-medium text-gray-900 text-right">
                Description
              </span>
              <Input
                name="payments.feeSchedules.admission[0].description"
                value={payments?.feeSchedules?.admission?.[0]?.description ||
                  ""}
              />
            </div>
            <div class="flex justify-start my-2">
              <span class="w-32 pr-3 text-sm font-medium text-gray-900 text-right">
                Amount (msats)
              </span>
              <Input
                type="number"
                min="1000"
                name="payments.feeSchedules.admission[0].amount"
                value={payments?.feeSchedules?.admission?.[0]?.amount || 0}
                onInput={(e) => {
                  if (e?.target?.value) {
                    minBalance.current = BigInt(Number(e.target.value) / 1000);
                    if (minBalance.current < 0n) {
                      minBalance.current = 0n;
                    }
                  }
                }}
              />
              <input
                type="hidden"
                name="limits.event.pubkey.minBalance"
                value={minBalance.current}
              />
            </div>
            {
              /* <div class="flex justify-start my-2">
                  <span class="w-32 pr-3 text-sm font-medium text-gray-900 text-right">
                    Whitelist Pubkey
                  </span>
                  <Input
                    name="payments.feeSchedules.admission[0].whitelists.event_kinds"
                    value={payments?.feeSchedules?.admission?.[0]?.whitelists
                      ?.event_kinds}
                  />
                </div> */
            }
          </>
        )}

        <div class="flex justify-start my-5">
          <span class="w-32 text-right"></span>
          <Save />
        </div>
      </form>
    </div>
  );
}
