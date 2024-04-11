import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IElement } from '../../models/elements-interfaces';

@Injectable({ providedIn: 'root' })
export class ElementsData {
  elements$ = new BehaviorSubject<IElement[]>([]);
}
