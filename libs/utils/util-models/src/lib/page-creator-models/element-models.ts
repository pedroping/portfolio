import { Type } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface IBasicElement {
  id: number;
  name: string;
  opened: boolean;
  icon?: string;
}

export interface IDomElementOptions {
  opened: boolean;
  isFullScreen?: boolean;
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
  pageContent?: Type<unknown>;
}

export interface IElementReference extends IDomElementOptions {
  id: number;
  lastPosition: {
    x: number;
    y: number;
  };
  element$: BehaviorSubject<HTMLElement | null>;
  onDestroy$: Subject<void>;
}

export type IPageConfig = IInitialConfig & IElementReference;

export type IPageMock = {
  config: IInitialConfig;
  domConfig: IDomElementOptions;
};

export interface IPageComponent {
  element: HTMLElement;
}
