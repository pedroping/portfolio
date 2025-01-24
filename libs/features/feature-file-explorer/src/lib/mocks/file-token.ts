import { DestroyRef, InjectionToken } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IApp } from '@portifolio/utils/util-models';
import { BehaviorSubject } from 'rxjs';

export const FILE_TOKEN = new InjectionToken<BehaviorSubject<IApp[]>>(
  'FILE_TOKEN',
);

export function getTokenObservable$(
  token: BehaviorSubject<IApp[]>,
  destroyRef: DestroyRef,
) {
  return token.asObservable().pipe(takeUntilDestroyed(destroyRef));
}
