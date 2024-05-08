import { animate, style } from '@angular/animations';
import { IAnimation, IAvailableAnimations } from '../models/animation-models';

export const ENTER_ANIMATIONS_Y: IAnimation = [
  style({ opacity: 0, transform: 'translateY(100%)' }),
  animate(100, style({ opacity: 1, transform: 'translateY(0)' })),
];

export const LEAVE_ANIMATIONS_Y: IAnimation = [
  style({ opacity: 1, transform: 'translateY(0)' }),
  animate(100, style({ opacity: 1, transform: 'translateY(100%)' })),
];

export const ALL_ANIMATIONS: { [key in IAvailableAnimations]: IAnimation } = {
  enterAnimationY: ENTER_ANIMATIONS_Y,
  leaveAnimationY: LEAVE_ANIMATIONS_Y,
};
