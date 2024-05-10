import { animate, style } from '@angular/animations';
import { IAnimation, IAvailableAnimations } from '../models/animation-models';

export const ENTER_ANIMATION_Y: IAnimation = [
  style({ opacity: 0, transform: 'translateY(100%)' }),
  animate(50, style({ opacity: 1, transform: 'translateY(0)' })),
];

export const LEAVE_ANIMATION_Y: IAnimation = [
  style({ opacity: 1, transform: 'translateY(0)' }),
  animate(50, style({ opacity: 1, transform: 'translateY(100%)' })),
];

export const ENTER_ABOVE_ANIMATION_Y: IAnimation = [
  style({ opacity: 0, transform: 'translateY(-100%)' }),
  animate(50, style({ opacity: 1, transform: 'translateY(0)' })),
];

export const LEAVE_ABOVE_ANIMATION_Y: IAnimation = [
  style({ opacity: 1, transform: 'translateY(0)' }),
  animate(50, style({ opacity: 1, transform: 'translateY(-100%)' })),
];

export const ALL_ANIMATIONS: { [key in IAvailableAnimations]: IAnimation } = {
  enterAnimationY: ENTER_ANIMATION_Y,
  leaveAnimationY: LEAVE_ANIMATION_Y,
  enterAboveAnimationY: ENTER_ABOVE_ANIMATION_Y,
  leaveAboveAnimationY: LEAVE_ABOVE_ANIMATION_Y,
};
