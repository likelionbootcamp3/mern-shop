import * as yup from "yup";

export const productSchema = yup
  .object({
    title: yup.string().required(),
    category: yup.string().oneOf(["smartphones", "laptop"], "Select a catgory"),
    price: yup.number().positive().required().typeError("Must be a number"),
    image: yup.mixed(),
    description: yup.string().required(),
  })
  .required();
