import { Component } from '@angular/core';
import { OpenSubContextMenuDirective } from '../../directives/open-sub-context-menu/open-sub-context-menu.directive';
import { OptionEventDirective } from '../../directives/option-event/option-event.directive';
import { OptionDirective } from '../../directives/option/option.directive';
import { IContextMenu } from '../../models/context-menu-models';

@Component({
  selector: 'context-menu-default',
  templateUrl: './context-menu-default.component.html',
  styleUrls: ['./context-menu-default.component.scss'],
  standalone: true,
  imports: [OpenSubContextMenuDirective, OptionEventDirective, OptionDirective],
})
export class ContextMenuDefaultComponent<T> implements IContextMenu<T> {
  viewContextMenuComponent = import(
    '../sub-context-menu-view/sub-context-menu-view.component'
  ).then((c) => c.SubContextMenuViewComponent);
  shortBySubContextMenuComponent = import(
    '../sub-context-menu-short-by/sub-context-menu-short-by.component'
  ).then((c) => c.SubContextMenuShortByComponent);
  subContextMenuNewComponent = import(
    '../sub-context-menu-new/sub-context-menu-new.component'
  ).then((c) => c.SubContextMenuNewComponent);

  data?: T;
  parentId: string | number = '';
}
