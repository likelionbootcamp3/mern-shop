import { useForm } from "react-hook-form";
import FormRow from "../../../components/common/FormRow";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../../components/common/Loader";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormRowError from "../../../components/common/FormRowError";
import { useNavigate, useParams } from "react-router-dom";
import GlobalSpinner from "../../../components/common/GlobalSpinner";
import { useEffect } from "react";
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

const AdminProductsEdit = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => axios.get(`products/${productId}`),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(data?.data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return axios.put(`/products/${productId}`, newProduct);
    },
    onSuccess: () => {
      navigate("/admin/products");
      toast.success("Succesfully add product!");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return <GlobalSpinner />;

  return (
    <AdminProductForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      isLoading={mutation.isLoading}
      errors={errors}
      btnLabel="Save Product"
    />
  );

  return (
    <div>
      {/* Container */}
      <div className="max-w-screen-md mx-auto px-4">
        {/* Layout */}
        <div className="py-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Fields */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Title */}
              <FormRow label="Title" className="col-span-full">
                <input
                  type="text"
                  placeholder="Enter your product name here..."
                  className="input input-bordered w-full"
                  {...register("title")}
                />
                <FormRowError error={errors.title} />
              </FormRow>

              {/* Category */}
              <FormRow label="Category">
                <select
                  className="select select-bordered w-full"
                  defaultValue="default"
                  {...register("category")}
                >
                  <option disabled value="default">
                    Choose a category
                  </option>
                  <option value="smartphones">Smartphones</option>
                  <option value="laptop">Laptop</option>
                </select>
                <FormRowError error={errors.category} />
              </FormRow>

              {/* Price */}
              <FormRow label="Price">
                <label className="input-group">
                  <input
                    type="text"
                    placeholder="0.01"
                    className="input input-bordered w-full"
                    step={0.01}
                    {...register("price")}
                  />
                  <span>USD</span>
                </label>
                <FormRowError error={errors.price} />
              </FormRow>

              {/* ImageURl */}
              <FormRow label="Image Url" className="col-span-full">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  {...register("imageUrl")}
                />
                <FormRowError error={errors.imageUrl} />
              </FormRow>

              {/* Description */}
              <FormRow label="Description" className="col-span-full">
                <textarea
                  className="textarea textarea-bordered resize-none h-36"
                  placeholder="Write something here..."
                  {...register("description")}
                ></textarea>
                <FormRowError error={errors.description} />
              </FormRow>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={mutation.isLoading}
            >
              <div className="flex items-center gap-2">
                {mutation.isLoading && <Loader />}
                <span>Save</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductsEdit;
