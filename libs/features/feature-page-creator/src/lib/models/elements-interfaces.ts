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

export interface IElement {
  id: number;
  element: ElementRef<HTMLElement>;
  opened: boolean;
  lastPosition: {
    x: number;
    y: number;
  };
  isFullScreen: boolean;
  elementActions: IElementActions;
}

export interface IPageConfig {
  customX?: number;
  customY?: number;
  startOnMiddle?: boolean;
  name: string;
  baseSizes: {
    width: number;
    height: number;
  };
  pageContent: Type<unknown>;
  elementReference$: BehaviorSubject<IElement | null>;
}

export interface IPageComponent {
  element: ElementRef<HTMLElement>;
}

export type IInitialConfig = Omit<IPageConfig, 'elementReference$'>;
export type IDomElementOptions = Partial<
  Omit<IElement, 'id' | 'element' | 'elementActions' | 'lastPosition'>
>;
