import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GlobalSpinner from "../../components/common/GlobalSpinner";

const ProductDetail = () => {
  const { productId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => {
      return axios.get(`/products/${productId}`);
    },
  });

  if (isLoading) return <GlobalSpinner />;

  const { data: product } = data;

  return (
    <div>
      {/* Container */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Layout */}
        <div className="grid md:grid-cols-2 items-start gap-8 py-8">
          {/* Product Image */}
          <div>
            <img
              alt="Les Paul"
              src={product.imageUrl}
              className="object-cover w-full aspect-1/2 rounded-xl"
            />
          </div>

          {/* Product Content */}
          <div>
            {/* Category */}
            <span className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
              {product.category}
            </span>

            {/* Title & Price */}
            <div className="flex justify-between my-4">
              <div className="max-w-xs">
                <h3 className="text-2xl font-bold">{product.title}</h3>
              </div>
              <p className="text-lg font-bold">${product.price}</p>
            </div>

            {/* Description */}
            <div>
              <div>
                <h5 className="font-bold">Description:</h5>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
