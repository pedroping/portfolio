import { Type, ViewRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface IBasicElement {
  id: number;
  name: string;
  opened: boolean;
  icon?: string;
  onDestroy$: Subject<void>;
  onMinimize$: Subject<void>;
  onMaximaze$: Subject<void>;
}

export interface IInitialConfig {
  name: string;
  baseSizes: {
    width: number;
    height: number;
    minWidth?: number;
    minHeight?: number;
  };
  customX?: number;
  customY?: number;
  icon?: string;
  sub?: string;
  pageContent?: () => Promise<Type<unknown>>;
  opened: boolean;
  isFullScreen?: boolean;
}

export interface IElementReference<T> {
  id: number;
  lastPosition: {
    x: number;
    y: number;
  };
  hostView$: BehaviorSubject<ViewRef | null>;
  element$: BehaviorSubject<HTMLElement | null>;
  onDestroy$: Subject<void>;
  onMinimize$: Subject<void>;
  onMaximaze$: Subject<void>;
  renameElement$: Subject<string>;
  data?: T;
}

export type IPageConfig<T = unknown> = IInitialConfig & IElementReference<T>;

export type IPageMock<T = unknown> = {
  config: IInitialConfig;
  data?: T;
};

export interface IPageComponent {
  element: HTMLElement;
}
