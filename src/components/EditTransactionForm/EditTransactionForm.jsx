import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import css from "./EditTransactionForm.module.css";
import { getEditTxSchema } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import {
  editTransaction,
  getAllTransactions,
} from "../../redux/transactions/operations.js";
import { closeModal } from "../../redux/modal/slice.js";
import { selectIsEditTransaction } from "../../redux/transactions/selectors.js";

export default function EditTransactionForm() {
  const dispatch = useDispatch();
  const selectEditTransaction = useSelector(selectIsEditTransaction);

  const isExpense = selectEditTransaction.type == "expense";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(getEditTxSchema(isExpense)),
    defaultValues: {
      category: selectEditTransaction.category,
      type: selectEditTransaction.type,
      sum: "",
      date: new Date(),
      comment: "",
    },
  });

  /* submit */
  const onSubmit = async (values) => {
    await dispatch(
      editTransaction({ ...values, _id: selectEditTransaction._id })
    )
      .unwrap()
      .then(() => {
        dispatch(getAllTransactions())
          .unwrap()
          .then(() => dispatch(closeModal()));
      });
  };

  const onClose = () => {
    dispatch(closeModal());
  };

  return (
    <div>
      <button
        type="button"
        className={css["edittransactionform-closeBtn"]}
        onClick={onClose}
        aria-label="Close"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M1 1L17 17" stroke="#FBFBFB" strokeWidth="1" />
          <path d="M1 17L17 1" stroke="#FBFBFB" strokeWidth="1" />
        </svg>
      </button>

      <form
        className={css["edittransactionform-form"]}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2 className={css["edittransactionform-title"]}>Edit transaction</h2>

        <div className={css["edittransactionform-typeSwitch"]}>
          <span
            className={
              isExpense
                ? css["edittransactionform-typeIncome"]
                : css["edittransactionform-typeIncomeActive"]
            }
          >
            Income
          </span>
          <span className={css["edittransactionform-divider"]}>/</span>
          <span
            className={
              isExpense
                ? css["edittransactionform-typeExpenseActive"]
                : css["edittransactionform-typeExpense"]
            }
          >
            Expense
          </span>
        </div>

        {/* CATEGORY */}
        {isExpense && (
          <div className={css["edittransactionform-row"]}>
            <select
              {...register("category")}
              className={css["edittransactionform-select"]}
            >
              <option value="" hidden>
                Select…
              </option>
              <option value={"Main expenses"}>Main expenses</option>
              <option value={"Products"}>Products</option>
              <option value={"Car"}>Car</option>
              <option value={"Self care"}>Self care</option>
              <option value={"Child care"}>Child care</option>
              <option value={"Household products"}>Household products</option>
              <option value={"Education"}>Education</option>
              <option value={"Leisure"}>Leisure</option>
              <option value={"Other expenses"}>Other expenses</option>
              <option value={"Entertainment"}>Entertainment</option>
            </select>
          </div>
        )}
        {errors.category && (
          <span className={css["edittransactionform-error"]}>
            {errors.category.message}
          </span>
        )}

        {/* SUM + DATE */}
        <div className={css["edittransactionform-double"]}>
          <div className={css["edittransactionform-half"]}>
            <div className={css["edittransactionform-inputWrapper"]}>
              <input
                type="number"
                step="0.01"
                {...register("sum")}
                className={`${css["edittransactionform-input"]} ${css["input"]} ${css.inputNumber}`}
              />
            </div>
            {errors.sum && (
              <span className={css["edittransactionform-error"]}>
                {errors.sum.message}
              </span>
            )}
          </div>

          <div className={css["edittransactionform-half"]}>
            <div className={css["edittransactionform-inputWrapper"]}>
              <div className={css["edittransactionform-dateWrapper"]}>
                <DatePicker
                  selected={watch("date")}
                  onChange={(d) =>
                    setValue("date", d, { shouldValidate: true })
                  }
                  dateFormat="dd.MM.yyyy"
                  className={`${css["edittransactionform-dateInput"]} ${css.dateInput} `}
                />
                <svg
                  className={css["edittransactionform-calendarIcon"]}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9 11H7V13H9V11ZM13 11H11V13H13V11ZM17 11H15V13H17V11ZM19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z"
                    fill="#734AEF"
                  />
                </svg>
              </div>
            </div>
            {errors.date && (
              <span className={css["edittransactionform-error"]}>
                {errors.date.message}
              </span>
            )}
          </div>
        </div>

        {/* COMMENT */}
        <div className={css["edittransactionform-row"]}>
          <div className={css["edittransactionform-inputWrapper"]}>
            <input
              type="text"
              {...register("comment")}
              className={` ${css.input}`}
            />
          </div>
          {errors.comment && (
            <span className={css["edittransactionform-error"]}>
              {errors.comment.message}
            </span>
          )}
        </div>

        {/* BUTTONS */}
        <div className={css["edittransactionform-buttons"]}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={css["edittransactionform-saveBtn"]}
          >
            Save
          </button>
          <button
            type="button"
            className={css["edittransactionform-cancelBtn"]}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
