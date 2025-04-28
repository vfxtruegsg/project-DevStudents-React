import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import css from "./Chart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

// принимает пропс data в таком формате, грубо говоря data
// при ответе на запрос /transactions/summary,
// и пропс balance для отрисовки по центру суммы денег пользователя

// {
//   "Main expenses": 130,
//   Products: 120,
//   Car: 100,
//   "Self care": 80,
//   "Child care": 60,
//   "Household products": 90,
//   Education: 70,
//   Leisure: 50,
//   "Other expenses": 40,
//   Entertainment: 30,
//   Incomes: 1000,
//   totalExpenses: 600,
// }


const Chart = ({ data, balance }) => {
  if (!data) return <p className={css.noData}>No information to draw graph</p>;

  const excludedKeys = ["totalExpenses", "Incomes"];

  const labels = Object.keys(data).filter((key) => !excludedKeys.includes(key));
  const values = labels.map((label) => data[label]);

  const backgroundColors = [
    "#fed057",
    "#ffd8d0",
    "#fd9498",
    "#c5baff",
    "#6e78e8",
    "#4a56e2",
    "#81e1ff",
    "#24cca7",
    "#00ad84",
  ];

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart) {
      const { width, height } = chart;
      const ctx = chart.ctx;
      ctx.restore();

      ctx.font = `600 18px sans-serif`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillStyle = "#fbfbfb";

      const text = `$${balance}`;
      const textX = width / 2;
      const textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: values,
        backgroundColor: backgroundColors.slice(0, labels.length),
        borderColor: backgroundColors.slice(0, labels.length),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={css.chartWrapper}>
      <Doughnut
        data={chartData}
        options={{ cutout: "72%", plugins: { legend: false } }}
        plugins={[centerTextPlugin]}
      />
    </div>
  );
};

export default Chart;
