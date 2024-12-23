interface ChildItem {
  title: string;
  subItems: {
    name: string;
    link: string;
    target: string;
  }[];
}
interface Menu {
  name: string;
  type: string;
  accessor: string;
  children: ChildItem[];
}

interface SocialLinks {
  name: string;
  link: string;
}
