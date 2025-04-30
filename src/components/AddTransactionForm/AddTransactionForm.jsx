import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import * as yup from "yup";
import css from "./AddTransactionForm.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../redux/transactions/operations.js";
import { closeModal } from "../../redux/modal/slice.js";

const categories = [
  "Main expenses",
  "Products",
  "Car",
  "Self care",
  "Child care",
  "Household products",
  "Education",
  "Leisure",
  "Other expenses",
  "Entertainment",
];

const schema = yup.object({
  type: yup.string().required(),
  category: yup.string().when("type", {
    is: "expense",
    then: (schema) => schema.required("Category is required"),
  }),
  sum: yup
    .number()
    .typeError("Enter a number")
    .positive("Must be positive")
    .required("Required"),
  date: yup.date().required("Required"),
  comment: yup.string().required("Required"),
});

const AddTransactionForm = ({ onCancel }) => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      type: "expense",
      sum: "",
      date: new Date(),
      category: "Main expenses",
      comment: "",
    },
    resolver: yupResolver(schema),
  });

  const type = watch("type");
  const category = watch("category");

  const handleTypeChange = (value) => setValue("type", value);

  const handleCategorySelect = (cat) => {
    setValue("category", cat);
    setShowDropdown(false);
  };

  const onSubmit = (payload) => {
    dispatch(addTransaction(payload))
      .unwrap()
      .then(() => dispatch(closeModal()));
    reset();
  };

  return (
    <form
      className={css.addForm}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <div className={css.formTitle}>Add transaction</div>

      <div className={css.switcher}>
        <span className={type === "income" ? css.active : ""}>Income</span>
        <label className={css.switch}>
          <input
            type="checkbox"
            checked={type === "expense"}
            onChange={() =>
              handleTypeChange(type === "income" ? "expense" : "income")
            }
          />
          <span className={css.slider}>
            {type === "income" ? (
              <img src="/plus.svg" alt="Plus" width="44" height="44" />
            ) : (
              <img src="/minus.svg" alt="Minus" width="44" height="44" />
            )}
          </span>
        </label>
        <span className={type === "expense" ? css.active : ""}>Expense</span>
      </div>

      {type === "expense" && (
        <div className={css.dropdownWrap}>
          <label className={css.dropdownLabel}></label>
          <div
            className={`${css.dropdownSelect} ${showDropdown ? css.open : ""}`}
            onClick={() => setShowDropdown((s) => !s)}
            tabIndex={0}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          >
            <span>{category || "Select a category"}</span>
            <span className={css.dropdownArrow}>&#9662;</span>
          </div>
          {showDropdown && (
            <div className={css.dropdownList}>
              {categories.map((cat) => (
                <div
                  key={cat}
                  className={`${css.dropdownItem} ${
                    cat === category ? css.selected : ""
                  }`}
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
          {errors.category && (
            <p className={css.error}>{errors.category.message}</p>
          )}
        </div>
      )}

      <div className={css.sumDateWrap}>
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          className={`${css.input} ${css.amountInput}`}
          {...register("sum")}
        />
        {errors.amount && <p className={css.error}>{errors.amount.message}</p>}

        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <div className={css.datePickerWrap}>
              <div className={css.dateInputGroup}>
                <DatePicker
                  {...field}
                  selected={field.value}
                  dateFormat="dd.MM.yyyy"
                  className={`${css.input} ${css.dateInput}`}
                  calendarClassName="custom-calendar"
                />
                <span className={css.calendarIcon}>
                  <img
                    src="/calendar.svg"
                    alt="Calendar"
                    width="18"
                    height="20"
                  />
                </span>
              </div>
            </div>
          )}
        />
        {errors.date && <p className={css.error}>{errors.date.message}</p>}
      </div>

      <div className={css.inputWrap}>
        <input
          type="text"
          placeholder="Comment"
          className={`${css.input} ${css.inputComment}`}
          {...register("comment")}
        />
      </div>
      {errors.comment && <p className={css.error}>{errors.comment.message}</p>}

      <button type="submit" className={css.submitButton}>
        ADD
      </button>
      <button type="button" className={css.cancelButton} onClick={onCancel}>
        CANCEL
      </button>
    </form>
  );
};

export default AddTransactionForm;
