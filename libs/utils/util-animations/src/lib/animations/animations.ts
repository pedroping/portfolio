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

export const REVERSE_ENTER_ANIMATION_Y: IAnimation = [
  style({ opacity: 0, transform: 'translateY(-100%)' }),
  animate(100, style({ opacity: 1, transform: 'translateY(0)' })),
];

export const REVERSE_LEAVE_ANIMATION_Y: IAnimation = [
  style({ opacity: 1, transform: 'translateY(0)' }),
  animate(100, style({ opacity: 1, transform: 'translateY(-100%)' })),
];

export const ENTER_ANIMATION_X: IAnimation = [
  style({ opacity: 0, transform: 'translateX(-100%)' }),
  animate(50, style({ opacity: 1, transform: 'translateX(0)' })),
];

export const LEAVE_ANIMATION_X: IAnimation = [
  style({ opacity: 1, transform: 'translateX(0)' }),
  animate(50, style({ opacity: 1, transform: 'translateX(-100%)' })),
];

export const ENTER_ABOVE_ANIMATION_Y: IAnimation = [
  style({ opacity: 0, transform: 'translateY(-100%)' }),
  animate(50, style({ opacity: 1, transform: 'translateY(0)' })),
];

export const LEAVE_ABOVE_ANIMATION_Y: IAnimation = [
  style({ opacity: 1, transform: 'translateY(0)' }),
  animate(50, style({ opacity: 1, transform: 'translateY(-100%)' })),
];

export const ENTER_OPACITY: IAnimation = [
  style({ opacity: 0 }),
  animate(1000, style({ opacity: 1 })),
];

export const LEAVE_OPACITY: IAnimation = [
  style({ opacity: 1 }),
  animate(1000, style({ opacity: 0 })),
];

export const FAST_LEAVE_OPACITY: IAnimation = [
  style({ opacity: 1 }),
  animate(200, style({ opacity: 0 })),
];

export const ALL_ANIMATIONS: { [key in IAvailableAnimations]: IAnimation } = {
  enterAnimationY: ENTER_ANIMATION_Y,
  leaveAnimationY: LEAVE_ANIMATION_Y,
  enterAboveAnimationY: ENTER_ABOVE_ANIMATION_Y,
  leaveAboveAnimationY: LEAVE_ABOVE_ANIMATION_Y,
  leaveOpacity: LEAVE_OPACITY,
  fastLeaveOpacity: FAST_LEAVE_OPACITY,
  enterOpacity: ENTER_OPACITY,
  enterAnimationX: ENTER_ANIMATION_X,
  leaveAnimationX: LEAVE_ANIMATION_X,
  reverseEnterAnimationY: REVERSE_ENTER_ANIMATION_Y,
  reverseLeaveAnimationY: REVERSE_LEAVE_ANIMATION_Y,
};
