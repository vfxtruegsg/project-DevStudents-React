import { useSelector } from "react-redux";
import { selectSummary } from "../../redux/transactions/selectors.js";
import css from "./StatisticsTable.module.css";

=
const StatisticsTable = () => {
  const summary = useSelector(selectSummary);
  const keys = Object.keys(summary);

  const colorClasses = [
    "#fed057",
    "#ffd8d0",
    "#fd9498",
    "#c5baff",
    "#6e78e8",
    "#4a56e2",
    "#81e1ff",
    "#24cca7",
    "#00ad84",
    "#06755b",
  ];
  let counter = -1;

  return (
    <table className={css.statistics_table}>
      <thead className={css.statistics_table_head}>
        <tr>
          <th>Category</th>
          <th>Sum</th>
        </tr>
      </thead>
      <tbody>
        {[...keys].map((key, index) => {
          counter += 1;
          if (key === "totalExpenses" || key === "Incomes") {
            return null;
          }
          return (
            <tr className={css.statistics_table_tr} key={index}>
              <td className={css.statistics_table_cell}>
                <div
                  className={css.statistics_table_colorbox}
                  style={{ background: `${colorClasses[counter]}` }}
                ></div>
                <div>{key}</div>
              </td>
              <td className={css.statistics_table_cell_sum}>
                {typeof summary[key] === "object" ? "-" : summary[key]}
              </td>
            </tr>
          );
        })}
        <tr>
          <td className={css.statistics_table_title}>Expenses:</td>
          <td className={css.statistics_table_expvalue}>
            {/* Берем сумму из объекта */}
            {typeof summary.totalExpenses === "object"
              ? summary.totalExpenses.amount
              : summary.totalExpenses}
          </td>
        </tr>

        <tr>
          <td className={css.statistics_table_title}>Income:</td>
          <td className={css.statistics_table_incvalue}>
            {/* Берем сумму из объекта */}
            {typeof summary.Incomes === "object"
              ? summary.Incomes.amount
              : summary.Incomes}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default StatisticsTable;
