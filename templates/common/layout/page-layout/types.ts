import { AppRoute } from '@xpmarket/xpm.system.routes';

export interface MenuItemStructure extends MenuItemBase {
  levels?: MenuLevel[];
}

export interface MenuItemBase extends RouteToMenuItemMap {
  title: string;
  target?: string;
  onClick?: () => void;
}

export interface RouteToMenuItemMap extends Partial<Omit<AppRoute, 'path'>> {
  href?: string;
}

export interface MenuLevel {
  parent: MenuItemBase;
  children?: MenuItemBase[];
}
