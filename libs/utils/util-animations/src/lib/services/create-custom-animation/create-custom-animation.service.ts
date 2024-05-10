import { animate, style } from '@angular/animations';
import { Injectable } from '@angular/core';
import { IAnimation, ICustomStyle } from '../../models/animation-models';

@Injectable({ providedIn: 'root' })
export class CreateCustomAnimationService {
  constructor() {}

  createAnimation() {}

  createStyle(
    initialStyles: ICustomStyle,
    animationDuration: string,
    fianlStyles: ICustomStyle
  ): IAnimation {
    const initialStyleFunction = style(initialStyles);
    const finalStyleFunction = style(fianlStyles);

    return [
      initialStyleFunction,
      animate(animationDuration, finalStyleFunction),
    ];
  }
}
