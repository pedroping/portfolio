import { Component } from '@angular/core';
import { IContextMenu } from '../../models/context-menu-models';

@Component({
  selector: 'sub-context-menu-view',
  templateUrl: './sub-context-menu-view.component.html',
  styleUrls: ['./sub-context-menu-view.component.scss'],
  standalone: true,
})
export class SubContextMenuViewComponent<T> implements IContextMenu<T> {
  data?: T;
  parentId: string | number = '';
}
