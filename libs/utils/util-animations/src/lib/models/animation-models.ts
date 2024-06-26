import { AnimationMetadata } from '@angular/animations';

export type IAnimation = AnimationMetadata | AnimationMetadata[];
export type IAvailableAnimations =
  | 'enterAnimationY'
  | 'leaveAnimationY'
  | 'enterAnimationX'
  | 'leaveAnimationX'
  | 'enterAboveAnimationY'
  | 'leaveAboveAnimationY'
  | 'leaveOpacity'
  | 'enterOpacity'
  | 'fastLeaveOpacity'
  | 'reverseEnterAnimationY'
  | 'reverseLeaveAnimationY';
