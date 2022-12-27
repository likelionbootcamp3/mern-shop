import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import GlobalSpinner from "../../../components/common/GlobalSpinner";
import { EditIcon, TrashIcon } from "../../../components/common/icons";
import useDebounce from "../../../hooks/useDebounce";

const AdminProductsAction = ({ searchString, setSearchString }) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <input
        type="text"
        placeholder="Search product here..."
        className="input input-bordered w-full max-w-xs"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <Link to="new" className="btn btn-primary">
        New
      </Link>
    </div>
  );
};

const AdminProductsTable = ({ data, isLoading }) => {
  if (isLoading) return <GlobalSpinner />;

  const {
    data: { products },
  } = data;

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* Header */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.imageUrl} alt={item.title} />
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{item.title}</div>
                  </div>
                </div>
              </td>
              <td>
                <span className="badge badge-ghost">{item.category}</span>
              </td>
              <td>${item.price}</td>
              <th>
                <div className="flex items-center gap-2">
                  {/* Edit button */}
                  <div className="tooltip" data-tip="Edit">
                    <Link
                      to={`${item.id}/edit`}
                      className="btn btn-sm btn-square btn-info hover:opacity-90"
                    >
                      <EditIcon />
                    </Link>
                  </div>

                  {/* Delete Button */}
                  <div className="tooltip" data-tip="Delete">
                    <button className="btn btn-sm btn-square btn-error hover:opacity-90">
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AdminProducts = () => {
  const [searchString, setSearchString] = useState("");
  const debouncedSearch = useDebounce(searchString, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["products", { q: debouncedSearch }],
    queryFn: () =>
      axios.get("/products/search", { params: { q: searchString } }),
  });

  return (
    <div>
      {/* Container */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Layout */}
        <div className="py-6">
          {/* Search and New Button */}
          <AdminProductsAction
            searchString={searchString}
            setSearchString={setSearchString}
          />
          {/* Table */}
          <AdminProductsTable data={data} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
