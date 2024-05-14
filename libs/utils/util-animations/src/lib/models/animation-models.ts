import { AnimationMetadata } from '@angular/animations';

export type IAnimation = AnimationMetadata | AnimationMetadata[];
export type IAvailableAnimations =
  | 'enterAnimationY'
  | 'leaveAnimationY'
  | 'enterAboveAnimationY'
  | 'leaveAboveAnimationY';
