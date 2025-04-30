import * as yup from "yup";

/**
 * @param {boolean} isExpense
 */
export const getEditTxSchema = (isExpense) =>
  yup.object({
    sum: yup.number().positive("> 0"),
    date: yup.date(),
    type: yup.string().valid("income", "expense"),
    comment: yup.string().min(3, "Min 3 chars").max(60, "Max 60 chars"),
    ...(isExpense && {
      category: yup.string(),
    }),
  });
