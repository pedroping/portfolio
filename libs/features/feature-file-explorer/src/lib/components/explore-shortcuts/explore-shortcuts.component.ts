import { Component } from '@angular/core';
import { SectionActionDirective } from '../../directives/section-action/section-action.directive';
import { BackForwardHandleDirective } from '../../directives/back-forward-handle/back-forward-handle.directive';

@Component({
  selector: 'explore-shortcuts',
  templateUrl: './explore-shortcuts.component.html',
  styleUrls: ['./explore-shortcuts.component.scss'],
  standalone: true,
  imports: [SectionActionDirective, BackForwardHandleDirective],
})
export class ExploreShortcutsComponent {}
