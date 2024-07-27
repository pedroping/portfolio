import { Component } from '@angular/core';
import { OptionEventDirective } from '../../directives/option-event/option-event.directive';
import { OptionDirective } from '../../directives/option/option.directive';
import { IContextMenu } from '../../models/context-menu-models';

@Component({
  selector: 'sub-context-menu-short-by',
  templateUrl: './sub-context-menu-short-by.component.html',
  styleUrls: ['./sub-context-menu-short-by.component.scss'],
  standalone: true,
  imports: [OptionEventDirective, OptionDirective],
})
export class SubContextMenuShortByComponent<T> implements IContextMenu<T> {
  data?: T;
  parentId: string | number = '';
}
