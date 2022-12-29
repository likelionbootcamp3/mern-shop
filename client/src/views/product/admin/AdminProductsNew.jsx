import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import AdminProductForm from "./AdminProductForm";
import { productSchema } from "../../../validation/productSchema";
import { createProduct } from "../../../services/productService";

const AdminProductsNew = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const mutation = useMutation({
    mutationFn: (newProduct) => createProduct(newProduct),
    onSuccess: () => {
      reset();
      toast.success("Successfully created new product");
    },
  });

  return (
    <AdminProductForm
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      register={register}
      isLoading={mutation.isLoading}
      errors={errors}
      btnLabel="Create Product"
    />
  );
};

export default AdminProductsNew;
