import { useSelector } from "react-redux";
import TransactionsItem from "../TransactionsItem/TransactionsItem.jsx";
import css from "./TransactionsList.module.css";
import MediaQuery from "react-responsive";
import { selectTransactions } from "../../redux/transactions/selectors.js";

const TransactionsList = () => {
  const transactions = useSelector(selectTransactions);
  // const transactions = [
  //   {
  //     _id: 1,
  //     date: "21-21-2121",
  //     type: "income",
  //     category: "Income",
  //     comment: "udygskjg",
  //     sum: 100,
  //   },
  //   {
  //     _id: 2,
  //     date: "21-21-2120",
  //     type: "expense",
  //     category: "Car",
  //     comment: "udygskjg",
  //     sum: 50,
  //   },
  //   {
  //     _id: 3,
  //     date: "20-21-2121",
  //     type: "expense",
  //     category: "Car",
  //     comment: "udyg fgdskjg ghghgffffff",
  //     sum: 30,
  //   },
  // ];

  return (
    <div className={css.transactions_container}>
      {!transactions ? (
        <p>You dont have any transactions!</p>
      ) : (
        <>
          <MediaQuery minWidth={320} maxWidth={767}>
            <ul className={css.transactions_list}>
              {transactions.map((transaction) => (
                <li key={transaction._id}>
                  <TransactionsItem transaction={transaction} />
                </li>
              ))}
            </ul>
          </MediaQuery>
          <MediaQuery minWidth={768}>
            <table className={css.transactions_table}>
              <thead className={css.transactions_table_head}>
                <tr>
                  <th>Date</th>
                  <th className={css.center}>Type</th>
                  <th>Category</th>
                  <th>Comment</th>
                  <th>Sum</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    className={css.transactions_table_tr}
                    key={transaction._id}
                  >
                    <TransactionsItem transaction={transaction} />
                  </tr>
                ))}
              </tbody>
            </table>
          </MediaQuery>
        </>
      )}
    </div>
  );
};

export default TransactionsList;
