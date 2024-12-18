"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setOpenSidebar } from "@/redux/features/global/globalSlice";
import { setSession } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const dispatch = useDispatch();
  const { isOpenSidebar } = useSelector((state: RootState) => state.global);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const session = useSelector((state: RootState) => state.auth.session);

  const handleLogout = async () => {
    try {
      router.replace("/login");
      localStorage.removeItem("session");
      dispatch(setSession(null));
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 fixed z-30 w-full top-0">
      <div className="px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start ">
            <button
              onClick={() => dispatch(setOpenSidebar(!isOpenSidebar))}
              id="toggleSidebarMobile"
              aria-expanded="true"
              aria-controls="sidebar"
              className="lg:block mr-2 bg-regularAccent cursor-pointer p-1 hover:bg-regularAccent focus:ring-2 focus:ring-gray-100 rounded"
            >
              <svg
                id="toggleSidebarMobileHamburger"
                className="w-6 h-6 fill-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <Link
              href="/"
              className="text-xl font-bold flex items-center lg:ml-2.5"
            >
              <Image
                className="mx-auto rounded-full h-16 w-auto mt-4"
                width={224}
                height={224}
                src={"/soundmade.png"}
                alt="soundmade"
              />
            </Link>
          </div>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-100"
            >
              {typeof session !== "undefined" &&
              session !== null &&
              session?.user ? (
                <Image
                  src={"/soundmade.png"}
                  alt={session?.user?.fullName}
                  height={36}
                  width={36}
                  className="rounded-full border border-gray-200"
                />
              ) : (
                <div className="h-9 w-9 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                  {session?.user?.fullName}
                </div>
              )}
              <span className="ml-2 hidden sm:block">
                {session?.user?.fullName}
              </span>
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                onClick={() => setIsDropdownOpen(false)} // Close on click
              >
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">
                    {session?.user?.fullName}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {session?.user?.email}
                  </p>
                </div>
                <hr />
                <ul className="py-1 text-sm text-gray-700">
                  <li>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
