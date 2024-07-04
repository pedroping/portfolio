import { Component } from '@angular/core';
import { DefaultMenu } from '../../models/context-menu-models';
import { OptionEventDirective } from '../../directives/option-event/option-event.directive';
import { OptionDirective } from '../../directives/option/option.directive';

@Component({
  selector: 'context-menu-program',
  templateUrl: './context-menu-program.component.html',
  styleUrls: ['./context-menu-program.component.scss'],
  standalone: true,
  imports: [OptionEventDirective, OptionDirective],
})
export class ContextMenuProgramComponent<T> implements DefaultMenu<T> {
  data?: T;
}
