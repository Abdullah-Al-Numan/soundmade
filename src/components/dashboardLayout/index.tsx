import React from "react";
import Navbar from "../navbar";
import Sidebar from "../sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ILayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: ILayoutProps) => {
  const { isOpenSidebar } = useSelector((state: RootState) => state.global);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <main
          id="main-content"
          className={`flex-1 overflow-y-auto mt-16 bg-gray-50 ${
            isOpenSidebar ? "ml-72" : "ml-0"
          } transition-all duration-300`}
        >
          <div className="h-full p-4">{children}</div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
