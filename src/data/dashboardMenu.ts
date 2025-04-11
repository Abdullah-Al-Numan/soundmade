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
      {
        id: "6",
        label: "User List",
        href: "/user-list",
        icon: "bi bi-list",
        active: false,
        submenu: [],
      },
    ],
  },
  {
    id: "payment",
    label: "Payment",
    href: "/payment",
    icon: "bi bi-house",
    active: false,
    submenu: [],
  },
  {
    id: "klaviyo",
    label: "klaviyo",
    href: "",
    icon: "bi bi-email",
    active: false,
    submenu: [
      {
        id: "klaviyo-c",
        label: "Campaigns",
        href: "/klaviyo/campaigns",
        icon: "bi bi-list",
        active: false,
        submenu: [],
      },
    ],
  },
];
