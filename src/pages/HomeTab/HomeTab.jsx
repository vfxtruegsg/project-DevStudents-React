import ButtonAddTransactions from "../../components/ButtonAddTransactions/ButtonAddTransactions";

import s from "./HomeTab.module.css";
import Balance from "../../components/Balance/Balance.jsx";
import TransactionsList from "../../components/TransactionsList/TransactionsList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";
import { useEffect } from "react";
import { getAllTransactions } from "../../redux/transactions/operations.js";
import { selectTransactions } from "../../redux/transactions/selectors.js";

const HomeTab = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);

  const currentUserData = useSelector(selectUser);
  const transactions = useSelector(selectTransactions);

  return (
    <>
      <Balance number={currentUserData.balance} />
      <TransactionsList transactions={transactions} />
      <ButtonAddTransactions />
    </>
  );
};

export default HomeTab;
