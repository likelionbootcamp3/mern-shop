import { useState } from "react";
import { useForm } from "react-hook-form";
import FormRow from "../../../components/common/FormRow";

const AdminProductsNew = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {};

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
              </FormRow>

              {/* Price */}
              <FormRow label="Price">
                <input
                  type="number"
                  placeholder="0"
                  className="input input-bordered w-full"
                  {...register("price")}
                />
              </FormRow>

              {/* ImageURl */}
              <FormRow label="Image Url" className="col-span-full">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  {...register("imageURl")}
                />
              </FormRow>

              {/* Description */}
              <FormRow label="Description" className="col-span-full">
                <textarea
                  className="textarea textarea-bordered resize-none h-36"
                  placeholder="Write something here..."
                  {...register("description")}
                ></textarea>
              </FormRow>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductsNew;
