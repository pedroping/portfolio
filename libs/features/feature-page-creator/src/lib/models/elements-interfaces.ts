import { Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IBasicElement {
  id: number;
  name: string;
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
  pageContent?: Type<unknown>;
}

export interface IElement extends IDomElementOptions {
  id: number;
  element: HTMLElement;
  lastPosition: {
    x: number;
    y: number;
  };
  preventObservers$: BehaviorSubject<boolean>;
}

export interface IPageConfig extends IInitialConfig {
  elementReference$: BehaviorSubject<IElement | null>;
}

export interface IPageComponent {
  element: HTMLElement;
}
