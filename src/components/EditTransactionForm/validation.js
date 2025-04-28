import * as yup from "yup";

/**
 * @param {boolean} isExpense
 */
export const getEditTxSchema = (isExpense) =>
  yup.object({
    sum: yup
      .number()
      .typeError("Must be a number")
      .positive("> 0")
      .max(1e9, "Too big")
      .required("Required"),
    date: yup.date().required("Required"),
    comment: yup.string().max(60, "Max 60 chars"),
    ...(isExpense && {
      category: yup.string().required("Choose category"),
    }),
  });
