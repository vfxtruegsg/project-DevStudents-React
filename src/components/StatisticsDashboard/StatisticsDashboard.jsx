import React from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import css from "./StatisticsDashboard.module.css";

const months = [
  "All month",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = Array.from(
  { length: new Date().getFullYear() - 2020 + 1 },
  (_, i) => `${2020 + i}`
);

const StatisticsDashboard = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}) => {
  return (
    <div className={css.wrapper}>
      {/* Month */}
      <Listbox value={selectedMonth} onChange={onMonthChange}>
        {({ open }) => (
          <div className={`${css.dropdownWrapper} ${open ? css.open : ""}`}>
            <ListboxButton className={css.dropdownButton}>
              {selectedMonth}
            </ListboxButton>
            <ListboxOptions className={css.dropdownList}>
              {months.map((month) => (
                <ListboxOption key={month} value={month} as="li">
                  {({ selected }) => (
                    <div
                      className={`${css.dropdownItem} ${
                        selected ? css.dropdownItemActive : ""
                      }`}
                    >
                      {month}
                    </div>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        )}
      </Listbox>

      {/* Year */}
      <Listbox value={selectedYear} onChange={onYearChange}>
        {({ open }) => (
          <div className={`${css.dropdownWrapper} ${open ? css.open : ""}`}>
            <ListboxButton className={css.dropdownButton}>
              {selectedYear}
            </ListboxButton>
            <ListboxOptions className={css.dropdownList}>
              {years.map((year) => (
                <ListboxOption key={year} value={year} as="li">
                  {({ selected }) => (
                    <div
                      className={`${css.dropdownItem} ${
                        selected ? css.dropdownItemActive : ""
                      }`}
                    >
                      {year}
                    </div>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default StatisticsDashboard;

// // Состояния для выбранного месяца и года
// const [selectedMonth, setSelectedMonth] = useState("All month");
// const [selectedYear, setSelectedYear] = useState(`${new Date().getFullYear()}`);

// // Функции для изменения месяца и года
// const handleMonthChange = (month) => {
//   setSelectedMonth(month);
//   console.log("Выбран месяц:", month);
// };

// const handleYearChange = (year) => {
//   setSelectedYear(year);
//   console.log("Выбран год:", year);
// };

// <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//   <StatisticsDashboard
//     selectedMonth={selectedMonth}
//     selectedYear={selectedYear}
//     onMonthChange={handleMonthChange}
//     onYearChange={handleYearChange}
//   />
// </div>;
