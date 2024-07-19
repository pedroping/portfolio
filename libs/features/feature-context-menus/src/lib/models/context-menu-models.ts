import { Type } from '@angular/core';
import { ContextMenuDefaultComponent } from '../components/context-menu-default/context-menu-default.component';
import { ContextMenuProgramComponent } from '../components/context-menu-program/context-menu-program.component';

export type AvailableContextMenus = 'default' | 'program';

export interface ISizeProperties {
  width: number;
  height: number;
}

export interface IPositionProperties {
  x: number;
  y: number;
}

export interface DefaultMenu<T> {
  data?: T;
  parentId: number | string;
}

export function getContextMenu<T>(key: AvailableContextMenus) {
  const AVAILABLE_CONTEXT_MENUS: {
    [key in AvailableContextMenus]: Type<DefaultMenu<T>>;
  } = {
    default: ContextMenuDefaultComponent,
    program: ContextMenuProgramComponent,
  };

  return AVAILABLE_CONTEXT_MENUS[key];
}
