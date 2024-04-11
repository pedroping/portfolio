import { ElementRef, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IElement {
  id: number | string;
  element: ElementRef<HTMLElement>;
  opened: boolean;
  lastPosition: {
    x: number;
    y: number;
  };
  isFullScreen: boolean;
}

export interface IPageConfig {
  customX?: number;
  customY?: number;
  startOnMiddle?: boolean;
  baseSizes: {
    width: number;
    height: number;
  };
  elementReference: BehaviorSubject<IElement>;
  pageContent: Type<unknown>;
}

export type IInitialConfig = Omit<
  IPageConfig,
  'elementReference' | 'pageContent'
>;
