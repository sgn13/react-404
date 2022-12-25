export type SidebarItemType = {
  label?: string;
  icon?: JSX.Element;
  location?: string;
  path?: string;
  children?: SidebarItemType[];
};

export type StyledSidebarType = {
  label?: string;
  icon?: JSX.Element;
  src?: string;
  active?: string;
  mobile?: boolean;
  sidebarItems: SidebarItemType[];
  collapsed: boolean;
  setCollapsed: any;
  setActive: any;
};
export type StyledSidebarItemType = {
  active?: string;
  collapsed: boolean;
  item: SidebarItemType;
};
