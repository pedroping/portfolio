import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WorkspaceReferenceDataService {
  private element$ = new BehaviorSubject<HTMLElement | null>(null);
  private vcr$ = new BehaviorSubject<ViewContainerRef | null>(null);

  setElement(element: HTMLElement) {
    this.element$.next(element);
  }

  setVcr(vcr: ViewContainerRef) {
    this.vcr$.next(vcr);
  }

  get vcr() {
    return this.vcr$.value as ViewContainerRef;
  }

  get element() {
    return this.element$.value as HTMLElement;
  }

  get vcr$$() {
    return this.vcr$.asObservable();
  }

  get element$$() {
    return this.element$.asObservable();
  }
}
