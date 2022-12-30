import FormRow from "../../../components/common/FormRow";
import FormRowError from "../../../components/common/FormRowError";
import Loader from "../../../components/common/Loader";

const AdminProductForm = ({
  watch,
  onSubmit,
  register,
  errors,
  isLoading,
  btnLabel,
  isDirty = true,
}) => {
  return (
    <div>
      {/* Container */}
      <div className="max-w-screen-md mx-auto px-4">
        {/* Layout */}
        <div className="py-6">
          <form onSubmit={onSubmit}>
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

              {/* Image */}
              <FormRow label="Image">
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  {...register("image")}
                />

                {/* Preview Image */}
                {watch("imageUrl") && (
                  <img
                    className="mt-4"
                    src={watch("imageUrl")}
                    alt={watch("title")}
                  />
                )}
                <FormRowError error={errors.image} />
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
              disabled={isLoading || !isDirty}
            >
              <div className="flex items-center gap-2">
                {isLoading && <Loader />}
                <span>{btnLabel}</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductForm;
