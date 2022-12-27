import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LazyLoad from "react-lazy-load";
import { useQuery } from "@tanstack/react-query";
import ProductsLoader from "./loaders/ProductsLoader";

const ProductsFilter = ({ category, setCategory }) => {
  const changeCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="mb-6">
      {/* Container */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Layout */}
        <div>
          {/* Category Filter */}
          <div className="form-control w-full md:max-w-xs">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className="select select-bordered"
              value={category}
              onChange={changeCategory}
            >
              <option value="all">All</option>
              <option value="smartphones">Smartphones</option>
              <option value="laptop">Laptops</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsCard = ({ id, title, imageUrl, price, category }) => {
  return (
    <Link to={`/products/${id}`} className="block overflow-hidden group">
      <LazyLoad height={180} threshold={0.6}>
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </LazyLoad>

      <div className="relative pt-3 bg-white">
        <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
          {title}
        </h3>
        <div className="mt-1.5 flex items-center justify-between text-gray-900">
          <p className="tracking-wide">${price}</p>
          <p className="text-xs tracking-wide uppercase">{category}</p>
        </div>
      </div>
    </Link>
  );
};

const ProductsGrid = ({ products, isLoading }) => {
  return (
    <div>
      {/* Container */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <ProductsLoader />
          ) : (
            products.map((item) => (
              <ProductsCard
                key={item.id}
                id={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
                price={item.price}
                category={item.category}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const [category, setCategory] = useState("all");

  const { data, isLoading } = useQuery({
    queryKey: ["products", { category: category }],
    queryFn: () => {
      return axios.get("/products", {
        params: category !== "all" && { category: category },
      });
    },
  });

  return (
    <div className="py-6">
      <ProductsFilter category={category} setCategory={setCategory} />
      <ProductsGrid products={data?.data?.products} isLoading={isLoading} />
    </div>
  );
};

export default Products;
