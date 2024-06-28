import { Component } from '@angular/core';
import { OpenSubContextMenuDirective } from '../../directives/open-sub-context-menu/open-sub-context-menu.directive';
import { OptionEventDirective } from '../../directives/option-event/option-event.directive';
import { SubContextMenuNewComponent } from '../sub-context-menu-new/sub-context-menu-new.component';
import { SubContextMenuShortByComponent } from '../sub-context-menu-short-by/sub-context-menu-short-by.component';
import { SubContextMenuViewComponent } from '../sub-context-menu-view/sub-context-menu-view.component';

@Component({
  selector: 'context-menu-default',
  templateUrl: './context-menu-default.component.html',
  styleUrls: ['./context-menu-default.component.scss'],
  standalone: true,
  imports: [OpenSubContextMenuDirective, OptionEventDirective],
})
export class ContextMenuDefaultComponent {
  viewContextMenuComponent = SubContextMenuViewComponent;
  shortBySubContextMenuComponent = SubContextMenuShortByComponent;
  subContextMenuNewComponent = SubContextMenuNewComponent;
}
