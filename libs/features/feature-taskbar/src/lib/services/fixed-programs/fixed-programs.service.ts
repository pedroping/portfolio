import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FixedProgramsService {
  private hideFixed$ = new BehaviorSubject<number[]>([]);

  setNew(id: number) {
    this.hideFixed$.next([...this.hideFixed, id]);
  }

  removeId(id: number) {
    this.hideFixed$.next(this.hideFixed.filter((elementId) => elementId != id));
  }

  get hideFixed() {
    return this.hideFixed$.value;
  }

  get hideFixed$$() {
    return this.hideFixed$.asObservable();
  }
}
