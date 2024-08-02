import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import { OpenContextMenuDirective } from '@portifolio/features/feature-context-menus';
import { AppDropHandleDirective } from '@portifolio/utils/util-app-drop-handle';
import { FolderHandleComponent } from '../folder-handle/folder-handle.component';

@Component({
  selector: 'app-holder',
  templateUrl: './app-holder.component.html',
  styleUrls: ['./app-holder.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    FolderHandleComponent,
    AppDropHandleDirective,
    OpenContextMenuDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[id]': 'parentFolderId()',
  },
})
export class AppHolderComponent {
  id = input.required<number>();
  parentFolderId = input.required<string>();
}
