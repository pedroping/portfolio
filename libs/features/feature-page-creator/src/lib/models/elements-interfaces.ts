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
  lastPosition: {
    x: number;
    y: number;
  };
  element$: BehaviorSubject<HTMLElement | null>;
  preventObservers$: BehaviorSubject<boolean>;
  pageResizing$: BehaviorSubject<boolean>;
  pageMoving$: BehaviorSubject<boolean>;
}

export interface IPageConfig extends IInitialConfig {
  elementReference: IElement;
}

export interface IPageComponent {
  element: HTMLElement;
}
