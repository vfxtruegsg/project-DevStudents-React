import { CircleLoader } from "react-spinners";
import css from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={css.wrapper}>
      <CircleLoader size={150} color="#734aef" />
    </div>
  );
};
