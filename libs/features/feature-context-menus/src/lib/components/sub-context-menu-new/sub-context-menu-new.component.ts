import { Component } from '@angular/core';
import { OptionEventDirective } from '../../directives/option-event/option-event.directive';
import { OptionDirective } from '../../directives/option/option.directive';
import { IContextMenu } from '../../models/context-menu-models';

@Component({
  selector: 'sub-context-menu-new',
  templateUrl: './sub-context-menu-new.component.html',
  styleUrls: ['./sub-context-menu-new.component.scss'],
  standalone: true,
  imports: [OptionEventDirective, OptionDirective],
})
export class SubContextMenuNewComponent<T> implements IContextMenu<T> {
  data?: T;
  parentId: string | number = '';
}
