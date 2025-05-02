import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import css from "./Chart.module.css";
import { useSelector } from "react-redux";
import { selectSummary } from "../../redux/transactions/selectors.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return <p className={css.noData}>No information to draw graph</p>;
  }

  const excludedKeys = ["totalExpenses", "Incomes"];
  const labels = Object.keys(data).filter((key) => !excludedKeys.includes(key));
  const values = labels.map((label) => data[label]);

  const totalExpenses = data.totalExpenses ?? 0;

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
    "#ffcc00",
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

      const text = `₴${totalExpenses}`;
      ctx.fillText(text, width / 2, height / 2);
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
