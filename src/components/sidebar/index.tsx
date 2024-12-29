"use client";
import { memo, useState, FC, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname hook
import { sidebarMenuData } from "@/data/dashboardMenu";
import { Menu, SubMenu } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Sidebar: FC = () => {
  const { isOpenSidebar } = useSelector((state: RootState) => state.global);
  const pathname = usePathname(); // Get the current route

  return (
    <aside
      id="sidebar"
      className={`fixed z-20 h-full top-0 left-0 transition-width ease-in-out duration-300 mt-24 ${
        isOpenSidebar ? "w-full" : "w-0"
      } bg-white border-r border-gray-200 overflow-hidden`}
      aria-label="Sidebar"
    >
      <div className="flex-1 flex flex-col h-full min-h-0 overflow-y-auto">
        <div className="flex-1 px-3 overflow-y-auto">
          <ul className="space-y-2">
            {sidebarMenuData.map((menu) => (
              <MenuItem key={menu.id} menu={menu} currentPath={pathname} />
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

interface MenuItemProps {
  menu: Menu;
  currentPath: string;
}

const MenuItem: FC<MenuItemProps> = ({ menu, currentPath }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false);

  // Open submenu if the current path matches any of its items
  useEffect(() => {
    setIsSubMenuOpen(menu.submenu.some((sub) => sub.href === currentPath));
  }, [menu.submenu, currentPath]);

  const toggleSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen);

  const isActive =
    currentPath === menu.href ||
    menu.submenu.some((sub) => sub.href === currentPath);

  return (
    <li>
      {menu.submenu.length > 0 ? (
        <button
          onClick={toggleSubMenu}
          type="button"
          className={`text-base font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 w-full hover:bg-regularAccent ${
            isActive ? "bg-regularAccent" : "bg-white"
          }`}
        >
          <i className={menu.icon}></i>
          <span className="text-left ml-3 w-full">{menu.label}</span>
          <i
            className={`bi ${
              isSubMenuOpen ? "bi-chevron-up" : "bi-chevron-down"
            } text-sm ml-2`}
          ></i>
        </button>
      ) : (
        <Link
          href={menu.href}
          className={`text-base font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 w-full hover:bg-regularAccent ${
            isActive ? "bg-regularAccent" : "bg-white"
          }`}
        >
          <i className={menu.icon}></i>
          <span className="text-left ml-3 w-full">{menu.label}</span>
        </Link>
      )}
      {menu.submenu.length > 0 && (
        <ul className={`ml-4 ${isSubMenuOpen ? "block" : "hidden"}`}>
          {menu.submenu.map((subMenu) => (
            <SubMenuItem
              key={subMenu.id}
              menu={subMenu}
              currentPath={currentPath}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

interface SubMenuItemProps {
  menu: SubMenu;
  currentPath: string;
}

const SubMenuItem: FC<SubMenuItemProps> = ({ menu, currentPath }) => {
  const isActive = currentPath === menu.href;

  return (
    <li>
      <Link
        href={menu.href}
        className={`block text-sm font-normal hover:bg-gray-100 p-2 rounded my-1 ${
          isActive ? "bg-gray-100" : ""
        }`}
      >
        <i className={menu.icon}></i>
        <span className="ml-2">{menu.label}</span>
      </Link>
    </li>
  );
};

export default memo(Sidebar);
