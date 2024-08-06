import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const HEIGHT_ANIMATION = [
  trigger('heightAnimation', [
    state(
      'open',
      style({
        opacity: 1,
        height: '*',
      }),
    ),
    state(
      'closed',
      style({
        opacity: 0,
        height: 0,
        padding: 0,
      }),
    ),
    transition('closed => open', [style({ height: 0 }), animate('200ms ease')]),
    transition('open => closed', [
      style({ height: '*' }),
      animate('200ms ease'),
    ]),
  ]),
];
