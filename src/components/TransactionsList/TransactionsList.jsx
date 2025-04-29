import TransactionsItem from "../TransactionsItem/TransactionsItem.jsx";
import css from "./TransactionsList.module.css";
import MediaQuery from "react-responsive";

const TransactionsList = ({ transactions }) => {
  return (
    <div className={css.transactions_container}>
      {!Array.isArray(transactions) || transactions.length === 0 ? (
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
