import { Component } from '@angular/core';
import { IContextMenu } from '../../models/context-menu-models';

@Component({
  selector: 'sub-context-menu-short-by',
  templateUrl: './sub-context-menu-short-by.component.html',
  styleUrls: ['./sub-context-menu-short-by.component.scss'],
  standalone: true,
})
export class SubContextMenuShortByComponent<T> implements IContextMenu<T> {
  data?: T;
  parentId: string | number = '';
}
