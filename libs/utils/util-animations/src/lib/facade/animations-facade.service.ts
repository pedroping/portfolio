import { Injectable } from '@angular/core';
import { IAvailableAnimations, ICustomStyle } from '../models/animation-models';
import { BuildAnimation } from '../services/build-animation/build-animation.service';
import { CreateCustomAnimationService } from '../services/create-custom-animation/create-custom-animation.service';

@Injectable({ providedIn: 'root' })
export class AnimationsFacade {
  constructor(
    private readonly buildAnimation: BuildAnimation,
    private readonly createCustomAnimationService: CreateCustomAnimationService
  ) {}

  animate(animationKey: IAvailableAnimations, element: HTMLElement) {
    return this.buildAnimation.animate(animationKey, element);
  }

  createStyle(
    initialStyles: ICustomStyle,
    animationDuration: string,
    fianlStyles: ICustomStyle
  ) {
    return this.createCustomAnimationService.createStyle(
      initialStyles,
      animationDuration,
      fianlStyles
    );
  }
}
