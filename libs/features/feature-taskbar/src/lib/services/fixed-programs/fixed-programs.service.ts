import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FixedProgramsService {
  private hideFixed$ = new BehaviorSubject<number[]>([]);

  constructor() {}

  setNew(id: number) {
    this.hideFixed$.next([...this.hideFixed, id]);
  }

  get hideFixed() {
    return this.hideFixed$.value;
  }

  get hideFixed$$() {
    return this.hideFixed$.asObservable();
  }
}
