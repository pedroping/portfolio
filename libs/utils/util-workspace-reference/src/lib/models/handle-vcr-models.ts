import { ComponentRef } from '@angular/core';

export interface IComponent<T> {
  componentRef: ComponentRef<T>;
  index: number;
}
