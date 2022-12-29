import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import AdminProductForm from "./AdminProductForm";
import GlobalSpinner from "../../../components/common/GlobalSpinner";
import { productSchema } from "../../../validation/productSchema";
import useProduct from "../../../hooks/products/useProduct";
import { updateProductById } from "../../../services/productService";

const AdminProductsEdit = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  // Fetch product by id
  const { data, isLoading } = useProduct(productId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  // Reset data form after fetching from server
  useEffect(() => {
    reset(data?.data);
  }, [data]);

  // Update product
  const mutation = useMutation({
    mutationFn: (newProduct) => updateProductById(productId, newProduct),
    onSuccess: () => {
      navigate("/admin/products");
      toast.success("Succesfully update product!");
    },
  });

  if (isLoading) return <GlobalSpinner />;

  return (
    <AdminProductForm
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      register={register}
      isLoading={mutation.isLoading}
      errors={errors}
      btnLabel="Save Product"
      isDirty={isDirty}
    />
  );
};

export default AdminProductsEdit;
