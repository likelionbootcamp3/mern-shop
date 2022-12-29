import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/productService";

const useProduct = (productId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
  });
  return { data, isLoading };
};

export default useProduct;
