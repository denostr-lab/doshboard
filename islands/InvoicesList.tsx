import { InvoicesList as List } from "@/@types/invoice.ts";
import dayjs from "dayjs"

interface InvoicesListProps {
  data: List;
  pubkeyOrId: string;
}

export default function InvoicesList(props: InvoicesListProps) {
  const { data, pubkeyOrId = '' } = props;

  const renderItem = (item, index) => {
    return (
      <tr class="bg-white border-b  hover:bg-gray-50 g-gray-600">
        <td class="w-4 p-4">
          <div class="flex items-center">
            <label for="checkbox-table-search-1" class="sr-only">
              checkbox
            </label>
          </div>
        </td>
        <th
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {item._id}
        </th>
        <td class="px-6 py-4">
          {item.pubkey.slice(0, 5)}...{item.pubkey.slice(
            item.pubkey.length - 5,
          )}
        </td>
        <td class="px-6 py-4">
          {item.unit}
        </td>
        <td class="px-6 py-4">
          {item.amount_requested}
        </td>
        <td class="px-6 py-4">
          {item.amount_paid}
        </td>
        <td class="px-6 py-4">
          {dayjs(item.create_at).format("YYYY/MM/DD HH:mm:ss")}
        </td>
        <td class="px-6 py-4">
            {item.status}
        </td>
      </tr>
    );
  };

  const pageNum = (totalPage, index) => {
    return (
      <li>
        <a
          href="#"
          class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700    g-gray-700 ext-white"
        >
          {index}
        </a>
      </li>
    );
  };

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="flex items-center justify-between pb-4">
        {/* <div>
          <button
            id="dropdownRadioButton"
            data-dropdown-toggle="dropdownRadio"
            class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5    g-gray-700 order-gray-600"
            type="button"
          >
            <svg
              class="w-4 h-4 mr-2 text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              >
              </path>
            </svg>
            Last 30 days
            <svg
              class="w-3 h-3 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              >
              </path>
            </svg>
          </button>

          <div
            id="dropdownRadio"
            class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow"
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="top"
            style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(522.5px, 3847.5px, 0px);"
          >
            <ul
              class="p-3 space-y-1 text-sm text-gray-700"
              aria-labelledby="dropdownRadioButton"
            >
              <li>
                <div class="flex items-center p-2 rounded hover:bg-gray-100 g-gray-600">
                  <input
                    id="filter-radio-example-1"
                    type="radio"
                    value=""
                    name="filter-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 :ring-blue-600  :ring-offset-gray-800 focus:ring-2"
                  />
                  <label
                    for="filter-radio-example-1"
                    class="w-full ml-2 text-sm font-medium text-gray-900 rounded"
                  >
                    Last day
                  </label>
                </div>
              </li>
              <li>
                <div class="flex items-center p-2 rounded hover:bg-gray-100 g-gray-600">
                  <input
                    id="filter-radio-example-2"
                    type="radio"
                    value=""
                    name="filter-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 :ring-blue-600  :ring-offset-gray-800 focus:ring-2"
                  />
                  <label
                    for="filter-radio-example-2"
                    class="w-full ml-2 text-sm font-medium text-gray-900 rounded"
                  >
                    Last 7 days
                  </label>
                </div>
              </li>
              <li>
                <div class="flex items-center p-2 rounded hover:bg-gray-100">
                  <input
                    id="filter-radio-example-3"
                    type="radio"
                    value=""
                    name="filter-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 :ring-blue-600  :ring-offset-gray-800 focus:ring-2"
                  />
                  <label
                    for="filter-radio-example-3"
                    class="w-full ml-2 text-sm font-medium text-gray-900 rounded"
                  >
                    Last 30 days
                  </label>
                </div>
              </li>
              <li>
                <div class="flex items-center p-2 rounded hover:bg-gray-100 g-gray-600">
                  <input
                    id="filter-radio-example-4"
                    type="radio"
                    value=""
                    name="filter-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 :ring-blue-600  :ring-offset-gray-800 focus:ring-2"
                  />
                  <label
                    for="filter-radio-example-4"
                    class="w-full ml-2 text-sm font-medium text-gray-900 rounded"
                  >
                    Last month
                  </label>
                </div>
              </li>
              <li>
                <div class="flex items-center p-2 rounded hover:bg-gray-100 g-gray-600">
                  <input
                    id="filter-radio-example-5"
                    type="radio"
                    value=""
                    name="filter-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 :ring-blue-600  :ring-offset-gray-800 focus:ring-2"
                  />
                  <label
                    for="filter-radio-example-5"
                    class="w-full ml-2 text-sm font-medium text-gray-900 rounded"
                  >
                    Last year
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div> */}
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              >
              </path>
            </svg>
          </div>
          <form method={'GET'} >
          <input
            type="text"
            id="table-search"
            class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="please enter into pubkey or query id"
            name="pubkeyOrId"
            value={pubkeyOrId}
            style={{ width: "32rem" }}
          />
          </form>
        </div>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center">
                  <label for="checkbox-all-search" class="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                invoice_id
              </th>
              <th scope="col" class="px-6 py-3">
                public key
              </th>
              <th scope="col" class="px-6 py-3">
                units
              </th>
              <th scope="col" class="px-6 py-3">
                Invoice Price
              </th>
              <th scope="col" class="px-6 py-3">
                Income
              </th>
              <th scope="col" class="px-6 py-3">
                create_at
              </th>
              <th scope="col" class="px-6 py-3">
                invoice type
              </th>
            </tr>
          </thead>
          <tbody>
                {data.docs.length == 0 && (<tr style={{
                  height: 200,
                  width: '100%',
                }}>
                    <td colSpan={8}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                    no data
                    </div>
                    </td>
                  </tr>)}
                {data.docs.map((doc, index) => renderItem(doc, index))}
            
          </tbody>
        </table>
        <nav
          class="flex items-center justify-between pt-4"
          aria-label="Table navigation"
        >
          <span class="text-sm font-normal text-gray-500">
            Showing{" "}
            <span class="font-semibold text-gray-900">
              {((data.page-1) * data.limit == 0) ? 1 : (data.page-1) * data.limit }-{(data.page*data.limit < data.totalDocs) ? data.page*data.limit :  data.totalDocs }
            </span>{" "}
            of <span class="font-semibold text-gray-900">{data.totalDocs}</span>
          </span>
          <ul class="inline-flex items-center -space-x-px">
            <li>
              {data.hasPrevPage && (
                <a
                  href="#"
                  class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700    g-gray-700 ext-white"
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    >
                    </path>
                  </svg>
                </a>
              )}
              {!data.hasPrevPage && (
                <div class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg bg-gray-100 text-gray-700">
                  <span class="sr-only">Previous</span>
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    >
                    </path>
                  </svg>
                </div>
              )}
            </li>

            {Array(data.totalPages).fill(0).map((_, index) => {
              const page = index + 1;

              if (data.totalPages > 5 && index === 3) {
                <li>
                  <a
                    href="#"
                    class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700    g-gray-700 ext-white"
                  >
                    ...
                  </a>
                </li>;
              }

              const _onClick = () => {
                const url = new URL(window.location.href)
                url.searchParams.set('p', page.toString())
                window.location.href = url.toString()
              }

              return (
                <li>
                  <div
                  onClick={_onClick}
                    href="#"
                    class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700    g-gray-700 ext-white"
                  >
                    {page}
                  </div>
                </li>
              );
            })}
            {data.hasNextPage && (
              <li>
                <a
                  href="#"
                  class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700    g-gray-700 ext-white"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    >
                    </path>
                  </svg>
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
