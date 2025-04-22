import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

import css from "./EditTransactionForm.module.css";
import { editTxSchema } from "./validation";
import { backAPI } from "../../redux/auth/operations";

export default function EditTransactionForm({ tx, onClose, onSuccess }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(editTxSchema),
    defaultValues: {
      sum: tx.sum,
      date: new Date(tx.date),
      comment: tx.comment ?? "",
    },
  });

  const onSubmit = async (values) => {
    const body = { ...values, date: values.date.toISOString() };

    try {
      const { data } = await backAPI.patch(`/transactions/${tx._id}`, body);

      onSuccess && onSuccess(data);
      onClose();
    } catch (e) {
      const msg = e.response?.data?.message || e.message;
      toast.error(msg);
    }
  };

  return (
    <form
      className={css["edittransactionform-form"]}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <label className={css["edittransactionform-label"]}>
        Sum
        <input
          type="number"
          step="0.01"
          {...register("sum")}
          className="input"
        />
        {errors.sum && (
          <span className={css["edittransactionform-err"]}>
            {errors.sum.message}
          </span>
        )}
      </label>

      <label className={css["edittransactionform-label"]}>
        Date
        <div className={css["edittransactionform-dateWrapper"]}>
          <DatePicker
            selected={watch("date")}
            onChange={(d) => setValue("date", d, { shouldValidate: true })}
            dateFormat="dd.MM.yyyy"
            className={`input ${css["edittransactionform-dateInput"]}`}
          />
          <svg
            className={css["edittransactionform-calendarIcon"]}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_30_3146)">
              <path
                d="M9 11H7V13H9V11ZM13 11H11V13H13V11ZM17 11H15V13H17V11ZM19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z"
                fill="#734AEF"
              />
            </g>
            <defs>
              <clipPath id="clip0_30_3146">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        {errors.date && (
          <span className={css["edittransactionform-err"]}>
            {errors.date.message}
          </span>
        )}
      </label>

      <label className={css["edittransactionform-label"]}>
        Comment
        <input type="text" {...register("comment")} className="input" />
        {errors.comment && (
          <span className={css["edittransactionform-err"]}>
            {errors.comment.message}
          </span>
        )}
      </label>

      <button
        className={css["edittransactionform-saveBtn"]}
        type="submit"
        disabled={isSubmitting}
      >
        Save
      </button>
    </form>
  );
}
