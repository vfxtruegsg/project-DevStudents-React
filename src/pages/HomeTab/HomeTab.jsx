import ButtonAddTransactions from "../../components/ButtonAddTransactions/ButtonAddTransactions";
import s from "./HomeTab.module.css";
import Balance from "../../components/Balance/Balance.jsx";
import TransactionsList from "../../components/TransactionsList/TransactionsList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";
import { getAllTransactions } from "../../redux/transactions/operations.js";
import { selectTransactions } from "../../redux/transactions/selectors.js";
import MediaQuery from "react-responsive";
import { useEffect } from "react";

const HomeTab = () => {
  const dispatch = useDispatch();
  const currentUserData = useSelector(selectUser);
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    if (transactions.length === 0) {
      dispatch(getAllTransactions());
    }
  }, [dispatch, transactions.length]);

  return (
    <>
      <MediaQuery minWidth={320} maxWidth={767}>
        <Balance number={currentUserData.balance} />
      </MediaQuery>
      <TransactionsList transactions={transactions} />
      <ButtonAddTransactions />
    </>
  );
};

export default HomeTab;
