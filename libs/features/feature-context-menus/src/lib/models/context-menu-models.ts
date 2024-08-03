import { Type } from '@angular/core';

export type AvailableContextMenus = 'default' | 'program';

export interface ISizeProperties {
  width: number;
  height: number;
}

export interface IPositionProperties {
  x: number;
  y: number;
}

export interface IContextMenu<T> {
  data?: T;
  parentId: number | string;
}

export function getContextMenu<T>(key: AvailableContextMenus) {
  const AVAILABLE_CONTEXT_MENUS: {
    [key in AvailableContextMenus]: Promise<Type<IContextMenu<T>>>;
  } = {
    default: import(
      '../components/context-menu-default/context-menu-default.component'
    ).then((c) => c.ContextMenuDefaultComponent),
    program: import(
      '../components/context-menu-program/context-menu-program.component'
    ).then((c) => c.ContextMenuProgramComponent),
  };

  return AVAILABLE_CONTEXT_MENUS[key];
}
