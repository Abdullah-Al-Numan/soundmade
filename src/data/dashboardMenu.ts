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
        label: "Create Artist",
        href: "/create-artist",
        icon: "bi bi-list",
        active: false,
        submenu: [],
      },
      {
        id: "4",
        label: "Unapproved Artist",
        href: "/unapproved-artist",
        icon: "bi bi-list",
        active: false,
        submenu: [],
      },
      {
        id: "5",
        label: "Approved Artist",
        href: "/approved-artist",
        icon: "bi bi-list",
        active: false,
        submenu: [],
      },
    ],
  },
  {
    id: "feed",
    label: "Feed",
    href: "",
    icon: "bi bi-house",
    active: false,
    submenu: [
      {
        id: "post",
        label: "Post",
        href: "/feed/all-post",
        icon: "bi bi-list",
        active: false,
        submenu: [],
      },
    ],
  },
];
