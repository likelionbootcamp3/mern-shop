import { useForm } from "react-hook-form";
import FormRow from "../../../components/common/FormRow";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../components/common/Loader";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormRowError from "../../../components/common/FormRowError";
import AdminProductForm from "./AdminProductForm";

const schema = yup
  .object({
    title: yup.string().required(),
    category: yup.string().oneOf(["smartphones", "laptop"], "Select a catgory"),
    price: yup.number().positive().required().typeError("Must be a number"),
    imageUrl: yup.string().url().required(),
    description: yup.string().required(),
  })
  .required();

const AdminProductsNew = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return axios.post("/products/add", newProduct);
    },
    onSuccess: () => {
      reset();
      toast.success("Succesfully add product!");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <AdminProductForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      isLoading={mutation.isLoading}
      errors={errors}
      btnLabel="Create Product"
    />
  );
};

export default AdminProductsNew;
