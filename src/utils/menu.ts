export type IMenu = {
  title: string;
  name?: string;
  icon?: string;
  location?: string;
  hide?: boolean;
  tsx?: boolean;
  path?: string;
  children?: IMenu[];
}

const menus: IMenu[] = [
  {
    title: "配置中心",
    icon: "el-icon-s-home",
    children: [
      {
        title: "菜单1",
        path: "/home",
        name: "AllGroup",
        location: "/AllGroup"
      },
      {
        title: "菜单2",
        path: "/menu",
        name: "AllGroup",
        location: "/AllGroup"
      }
    ]
  },
  {
    title: "demand",
    icon: "el-icon-s-home",
    children: [
      {
        title: "menu1",
        path: "/home",
        name: "AllGroup",
        location: "/AllGroup"
      },
      {
        title: "menu12",
        path: "/menu",
        name: "AllGroup",
        location: "/AllGroup"
      }
    ]
  }
];
export default menus;