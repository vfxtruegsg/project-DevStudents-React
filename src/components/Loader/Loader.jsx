import { CircleLoader } from "react-spinners";
import css from "./Logout.module.css";

export const Loader = () => {
  return (
    <div className={css.wrapper}>
      <CircleLoader size={150} color="#fbfbfb" />
    </div>
  );
};
