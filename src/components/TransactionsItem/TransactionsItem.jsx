import { useDispatch } from "react-redux";
import css from "./TransactionsItem.module.css";
import MediaQuery from "react-responsive";
import { deleteTransaction } from "../../redux/transactions/operations.js";
import { changeEditTransaction } from "../../redux/transactions/slice.js";
import { openEditModal } from "../../redux/modal/slice.js";

const TransactionsItem = ({
  transaction: { _id, date, type, category, comment, sum },
}) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTransaction(_id));
  };
  const handleEdit = () => {
    dispatch(changeEditTransaction(_id));
    dispatch(openEditModal());
  };
  return (
    <>
      <MediaQuery minWidth={320} maxWidth={767}>
        <div
          className={type === "income" ? css.income_decor : css.expense_decor}
        >
          <ul className={css.transaction_list}>
            <li className={css.transaction_item}>
              <div className={css.transaction_title}>Date</div>
              <div className={`p-classic`}>{date}</div>
            </li>
            <li className={css.transaction_item}>
              <div className={css.transaction_title}>Type</div>
              <div className={`p-classic`}>{type === "income" ? "+" : "-"}</div>
            </li>
            <li className={css.transaction_item}>
              <div className={css.transaction_title}>Category</div>
              <div className={`p-classic`}>{category}</div>
            </li>
            <li className={css.transaction_item}>
              <div className={css.transaction_title}>Comment</div>
              <div className={`p-classic`}>{comment}</div>
            </li>
            <li className={css.transaction_item}>
              <div className={css.transaction_title}>Sum</div>
              <div
                className={
                  (`p-classic`, type === "income" ? css.income : css.expense)
                }
              >
                {sum}
              </div>
            </li>
            <li className={css.transaction_item}>
              <button
                type="button"
                className={css.transaction_delete_btn}
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                type="button"
                className={css.transaction_edit_btn}
                onClick={handleEdit}
              >
                <img
                  className={css.transaction_edit_btn_svg}
                  src="/edit.svg"
                  width="14"
                  height="14"
                  alt="Edit picture"
                />
                Edit
              </button>
            </li>
          </ul>
        </div>
      </MediaQuery>
      <MediaQuery minWidth={768}>
        <td className={css.transaction_item}>
          <div className={`p-classic`}>{date}</div>
        </td>
        <td className={css.transaction_item}>
          <div className={(`p-classic`, css.center)}>
            {type === "income" ? "+" : "-"}
          </div>
        </td>
        <td className={css.transaction_item}>
          <div className={`p-classic`}>{category}</div>
        </td>
        <td className={css.transaction_item_comment}>
          <div className={`p-classic`}>{comment}</div>
        </td>
        <td className={css.transaction_item}>
          <div
            className={
              (`p-classic`, type === "income" ? css.income : css.expense)
            }
          >
            {sum}
          </div>
        </td>
        <td className={css.transaction_item}>
          <div className={css.transaction_btn_wrapper}>
            <button
              type="button"
              className={css.transaction_edit_btn}
              onClick={handleEdit}
            >
              <img
                className={css.transaction_edit_btn_svg}
                src="/edit.svg"
                width="14"
                height="14"
                alt="Edit picture"
              />
            </button>
            <button
              type="button"
              className={css.transaction_delete_btn}
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </td>
      </MediaQuery>
    </>
  );
};

export default TransactionsItem;
