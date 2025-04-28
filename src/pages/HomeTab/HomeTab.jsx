import s from "./HomeTab.module.css";
import Balance from "../../components/Balance/Balance.jsx";
import TransactionsList from "../../components/TransactionsList/TransactionsList.jsx";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";

const HomeTab = () => {
  const currentUserData = useSelector(selectUser);
  return (
    <>
      <Balance number={currentUserData.balance} />
      <TransactionsList />
    </>
  );
};

export default HomeTab;
