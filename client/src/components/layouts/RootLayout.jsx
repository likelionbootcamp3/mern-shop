import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
};

export default RootLayout;
