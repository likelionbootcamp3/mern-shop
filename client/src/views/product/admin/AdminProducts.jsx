import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import GlobalSpinner from "../../../components/common/GlobalSpinner";

const EditIcon = () => {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );
};

const TrashIcon = () => {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
};

const AdminProductsAction = () => {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <input
        type="text"
        placeholder="Search product here..."
        className="input input-bordered w-full max-w-xs"
      />
      <Link to="new" className="btn btn-primary">
        New
      </Link>
    </div>
  );
};

const AdminProductsTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return axios.get("/products");
    },
  });

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
  return (
    <div>
      {/* Container */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Layout */}
        <div className="py-6">
          {/* Search and New Button */}
          <AdminProductsAction />
          {/* Table */}
          <AdminProductsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
