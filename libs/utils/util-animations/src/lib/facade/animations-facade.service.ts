import { Injectable } from '@angular/core';
import { IAvailableAnimations } from '../models/animation-models';
import { BuildAnimation } from '../services/build-animation/build-animation.service';

@Injectable({ providedIn: 'root' })
export class AnimationsFacade {
  constructor(private readonly buildAnimation: BuildAnimation) {}

  animate(animationKey: IAvailableAnimations, element: HTMLElement) {
    return this.buildAnimation.animate(animationKey, element);
  }
}
