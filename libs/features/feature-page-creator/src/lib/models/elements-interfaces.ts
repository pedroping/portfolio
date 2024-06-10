import { Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  };
  customX?: number;
  customY?: number;
  icon?: string;
  sub?: string;
  pageContent?: Type<unknown>;
}

export interface IElement extends IDomElementOptions {
  id: number;
  lastPosition: {
    x: number;
    y: number;
  };
  element$: BehaviorSubject<HTMLElement | null>;
}

export interface IPageConfig extends IInitialConfig {
  elementReference: IElement;
}

export type IPageMock = {
  config: IInitialConfig;
  domConfig: IDomElementOptions;
};

export interface IPageComponent {
  element: HTMLElement;
}
