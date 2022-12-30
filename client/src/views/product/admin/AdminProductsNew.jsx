import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AdminProductForm from "./AdminProductForm";
import { createProduct } from "../../../services/productService";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../../validation/productSchema";
import { useState } from "react";

const AdminProductsNew = () => {
  const [isFileUploading, setIsFileUploading] = useState(false);

  const {
    watch,
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

  const onSumit = (data) => {
    // mutation.mutate(data);
    const file = data.image[0];
    const category = data.category;

    // Upload file to the object 'products/smartphones/obama.png'
    const storageRef = ref(storage, `products/${category}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "running":
            setIsFileUploading(true);
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsFileUploading(false);
          mutation.mutate({ ...data, imageUrl: downloadURL });
        });
      }
    );
  };

  return (
    <AdminProductForm
      watch={watch}
      onSubmit={handleSubmit(onSumit)}
      register={register}
      isLoading={mutation.isLoading || isFileUploading}
      errors={errors}
      btnLabel="Create Product"
    />
  );
};

export default AdminProductsNew;
