import { IS_BROWSER } from "$fresh/runtime.ts";
import { Chart, ChartOptions } from "$fresh_charts/mod.ts";
import { ChartJs } from "$fresh_charts/deps.ts";
import { UTC } from "@/@types/data.ts";

interface ActivityProps {
  networkActivity: UTC;
}

export function Activity({ networkActivity }: ActivityProps) {
  const timeArrAM: UTC = {};
  for (let i = 0; i < 12; i++) {
    const timeString = i.toString();
    const timeStringPlusOne = (i + 1).toString();
    if (networkActivity[timeString]) {
      timeArrAM[timeStringPlusOne] = networkActivity[timeString];
    } else {
      timeArrAM[timeStringPlusOne] = 0;
    }
  }

  const timeArrPM: UTC = {};
  for (let i = 12; i < 24; i++) {
    const timeStringOriginal = i.toString();
    const timeString = (i - 12).toString();
    const timeStringPlusOne = (i - 12 + 1).toString();
    if (networkActivity[timeString]) {
      timeArrPM[timeStringPlusOne] = networkActivity[timeStringOriginal];
    } else {
      timeArrPM[timeStringPlusOne] = 0;
    }
  }

  const data: ChartJs.ChartData<"line", UTC> = {
    labels: [...Array(12).keys()].map((l) => (l + 1).toString()),
    datasets: [
      {
        label: "AM",
        data: timeArrAM,
        borderColor: "#fdba74",
        backgroundColor: "#fff7ed",
        borderWidth: 2,
        fill: false,
        stack: "line",
      },
      {
        label: "PM",
        data: timeArrPM,
        borderColor: "#67e8f9",
        backgroundColor: "#ecfeff",
        borderWidth: 2,
        fill: false,
        stack: "line",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    aspectRatio: 1,
    devicePixelRatio: 1,
    plugins: {
      legend: {
        labels: {
          color: "#57534e",
        },
        align: "end",
      },
    },
    scales: {
      x: {
        // type: 'linear',
        ticks: { font: { size: 12 }, color: "#57534e" },
        display: true,
        // title: {
        //   display: true,
        //   text: "Hours (UTC)",
        //   font: { size: 12 },
        //   color: "#a8a29e",
        // },
      },
      y: {
        type: "linear",
        ticks: { font: { size: 12 }, color: "#57534e", precision: 0 },
        display: true,
        title: {
          display: true,
          text: "Event count",
          font: { size: 16 },
          color: "#a8a29e",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div class="p-5 border-1 border-orange-200 bg-white">
      <span class="block text-center pb-3 text-lg text-orange-500 font-bold tracking-tighter">
        NETWORK ACTIVITY (24H)
      </span>
      <Chart
        type={"line"}
        data={data}
        options={options}
        width={448}
      />
    </div>
  );
}
