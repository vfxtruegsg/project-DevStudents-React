import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Chart = ({ data }) => {
  const settings = data.map((item, index) => {
    if (index == 8)
      return {
        labels: [
          "Main expenses",
          "Products",
          "Car",
          "Self care",
          "Child care",
          "Household products",
          "Education",
          "Leisure",
          "Other expenses",
        ],
        datasets: [
          {
            label: "# of Votes",
            data: [].push(item),
            backgroundColor: [
              " #fed057",
              " #ffd8d0",
              " #fd9498",
              " #c5baff",
              " #6e78e8",
              " #4a56e2",
              " #81e1ff",
              " #24cca7",
              " #00ad84",
            ],
            borderColor: [
              " #fed057",
              " #ffd8d0",
              " #fd9498",
              " #c5baff",
              " #6e78e8",
              " #4a56e2",
              " #81e1ff",
              " #24cca7",
              " #00ad84",
            ],
            borderWidth: 1,
          },
        ],
      };
  });

  return <Doughnut data={settings} />;
};
