import { Component } from '@angular/core';
import { IContextMenu } from '../../models/context-menu-models';

@Component({
  selector: 'sub-context-menu-new',
  templateUrl: './sub-context-menu-new.component.html',
  styleUrls: ['./sub-context-menu-new.component.scss'],
  standalone: true,
})
export class SubContextMenuNewComponent<T> implements IContextMenu<T> {
  data?: T;
  parentId: string | number = '';
}
