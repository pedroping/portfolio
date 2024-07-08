import { Component, ElementRef, OnInit, computed, input } from '@angular/core';
import {
  ContextMenuFacade,
  OpenContextMenuDirective,
} from '@portifolio/features/feature-context-menus';
import { IApp, IOptionEvent } from '@portifolio/utils/util-models';
import { Observable, filter, merge, take } from 'rxjs';
import { AppRenameComponent } from '../component/app-rename.component';
import { IconDropEventsHandleDirective } from '../directives/icon-drop-events-handle/icon-drop-events-handle.directive';
import { APP_BASE_ICON } from '../mocks/app-mocks';
import { DropEventsService } from '../services/drop-events.service';
@Component({
  selector: 'app-icon',
  templateUrl: './app-icon.component.html',
  styleUrls: ['./app-icon.component.scss'],
  standalone: true,
  hostDirectives: [
    { directive: IconDropEventsHandleDirective, inputs: ['config', 'id'] },
    {
      directive: OpenContextMenuDirective,
      inputs: ['openContextMenu', 'id'],
    },
  ],
  host: {
    id: 'app-icon',
    '[title]': 'title()',
    '[draggable]': 'true',
  },
  imports: [AppRenameComponent],
})
export class AppIconComponent implements OnInit {
  config = input.required<IApp>();
  id = input.required<string | number>();

  title = computed(() => this.config().name);
  logo = computed(() => this.config().logo || APP_BASE_ICON);

  parentId?: number | string;
  renameEvent$: Observable<IOptionEvent<string | number>> = new Observable<
    IOptionEvent<string | number>
  >();

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly dropEventsService: DropEventsService,
    private readonly contextMenuFacade: ContextMenuFacade<string | number>
  ) {}

  ngOnInit(): void {
    this.parentId = this.elementRef.nativeElement.parentElement?.id ?? '';

    this.renameEvent$ = this.contextMenuFacade
      .getEventByOption('program-rename', this.parentId)
      .pipe(filter((event) => event.data === this.id()));

    merge(
      this.contextMenuFacade.getEventByOption('program-delete'),
      this.dropEventsService.getEspecificEvent(this.id())
    )
      .pipe(take(1))
      .subscribe(() => this.elementRef.nativeElement.remove());
  }
}
