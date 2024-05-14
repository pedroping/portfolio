import { AnimationBuilder, AnimationFactory } from '@angular/animations';
import { Injectable } from '@angular/core';
import { IAvailableAnimations } from '../models/animation-models';
import { ALL_ANIMATIONS } from '../animations/animations';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BuildAnimation {
  constructor(private readonly _build: AnimationBuilder) {}

  animate(animationKey: IAvailableAnimations, element: HTMLElement) {
    const myAnimation = this.createAnimation(animationKey);
    return this.createPlayer(myAnimation, element);
  }

  private createPlayer(myAnimation: AnimationFactory, element: HTMLElement) {
    const animationFinished$ = new Subject<void>();

    const player = myAnimation.create(element);

    player.play();

    player.onDone(() => {
      animationFinished$.next();
    });

    return animationFinished$.asObservable();
  }

  private createAnimation(animationKey: IAvailableAnimations) {
    const animation = ALL_ANIMATIONS[animationKey];
    return this._build.build(animation);
  }
}
