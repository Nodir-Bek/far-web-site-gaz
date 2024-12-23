interface ChildItem {
  [key: string]: string;
}

export interface IMenuItemsSchema {
  name: string;
  type: string;
  accessor: string;
  link?: string;
  target?: string;
  subItems?: ChildItem[];
}
export const menuItems = ref<IMenuItemsSchema[]>([
  {
    name: "menu-title",
    type: "dropdown",
    accessor: "about",
    subItems: [
      {
        name: "menu-title-s-1",
        link: "/about-us",
        target: "_self",
        type: "design",
      },
      {
        name: "menu-title-s-2",
        link: "/about-us/management",
        target: "_self",
        type: "design",
      },
      {
        name: "menu-title-s-3",
        link: "/about-us/trade-union",
        target: "_self",
        type: "design",
      },
      {
        name: "menu-title-s-4",
        link: "/about-us/personnel-policy",
        target: "_self",
        type: "design",
      },
      {
        name: "menu-title-s-5",
        link: "/about-us/vacancies",
        target: "_self",
        type: "design",
      },
      {
        name: "menu-title-s-6",
        link: "/about-us/regional-documents",
        target: "_self",
        type: "design",
      },
      {
        name: "menu-title-s-7",
        link: "/about-us/honorary-personnel",
        target: "_self",
        type: "design",
      },
    ],
  },
  {
    name: "menu-title-1",
    type: "link",
    link: "/news",
    accessor: "news",
  },

  {
    name: "menu-title-2",
    type: "dropdown",
    accessor: "Consumer",
    subItems: [
      {
        name: "menu-title-2-s-1",
        link: "/to-consumers/natural-gas",
        target: "_self",
        type: "design",
      },
      {
        name: "menu-title-2-s-2",
        link: "/to-consumers/liquefied-gas",
        target: "_self",
        type: "design",
      },
      {
        name: "menu-title-2-s-3",
        link: "/to-consumers/open-data",
        target: "_self",
        type: "html",
      },
    ],
  },
  {
    name: "menu-title-3",
    type: "link",
    link: "/anti-corruption",
    accessor: "corruption",
  },
  {
    name: "menu-title-4",
    type: "link",
    target: "_blank",
    link: "https://cabinetaskug.hududgaz.uz/",
    accessor: "personal_cabinet",
  },
  {
    name: "menu-title-5",
    type: "link",
    link: "/contact-us",
    accessor: "link",
  },
]);

// export const socialLinks = [
//   {
//     name: "TelegramIcon",
//     link: "https://t.me/Hududgaz_Fargona",
//   },
//   {
//     name: "InstagramIcon",
//     link: "https://www.instagram.com/hududgaz_fargona_gtf/",
//   },
//   {
//     name: "FacebookIcon",
//     link: "https://www.facebook.com/hududgazfargonagtf",
//   },
//   {
//     name: "YoutubeIcon",
//     link: "https://www.youtube.com/@hududgazfargona",
//   },
// ];
