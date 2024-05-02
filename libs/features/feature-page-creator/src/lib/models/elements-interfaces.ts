import { ElementRef, Type } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface IElementActions {
  minimize$: Subject<void>;
  maximize$: Subject<void>;
  close$: Subject<void>;
}

export interface IBasicElement {
  id: number;
  name: string;
}

export interface IDomElementOptions {
  opened: boolean;
  isFullScreen?: boolean;
}

export interface IInitialConfig {
  customX?: number;
  customY?: number;
  name: string;
  baseSizes: {
    width: number;
    height: number;
  };
  pageContent: Type<unknown>;
}

export interface IElement extends IDomElementOptions {
  id: number;
  element: HTMLElement;
  lastPosition: {
    x: number;
    y: number;
  };
  elementActions: IElementActions;
}

export interface IPageConfig extends IInitialConfig {
  elementReference$: BehaviorSubject<IElement | null>;
}

export interface IPageComponent {
  element: HTMLElement;
}
