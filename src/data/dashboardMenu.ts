import { Menu } from "@/types";

export const sidebarMenuData: Menu[] = [
  {
    id: "1",
    label: "Dashboard",
    href: "/",
    icon: "bi bi-house",
    active: false,
    submenu: [],
  },
  {
    id: "2",
    label: "Artist",
    href: "/artist",
    icon: "bi bi-music-note",
    active: false,
    submenu: [
      {
        id: "3",
        label: "Unapproved Artist",
        href: "/unapproved-artist",
        icon: "bi bi-list",
        active: false,
        submenu: [],
      }
    ],
  },
];
