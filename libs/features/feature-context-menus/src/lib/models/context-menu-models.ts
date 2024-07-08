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
