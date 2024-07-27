import { Component } from '@angular/core';
import { OptionEventDirective } from '../../directives/option-event/option-event.directive';
import { OptionDirective } from '../../directives/option/option.directive';
import { IContextMenu } from '../../models/context-menu-models';

@Component({
  selector: 'sub-context-menu-view',
  templateUrl: './sub-context-menu-view.component.html',
  styleUrls: ['./sub-context-menu-view.component.scss'],
  standalone: true,
  imports: [OptionEventDirective, OptionDirective],
})
export class SubContextMenuViewComponent<T> implements IContextMenu<T> {
  data?: T;
  parentId: string | number = '';
}
