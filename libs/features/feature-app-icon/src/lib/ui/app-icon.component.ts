import { Component, ElementRef, OnInit, computed, input } from '@angular/core';
import { IApp } from '@portifolio/utils/util-models';
import { IconDropEventsHandleDirective } from '../directives/icon-drop-events-handle/icon-drop-events-handle.directive';
import { APP_BASE_ICON } from '../mocks/app-mocks';
import { OpenContextMenuDirective } from '@portifolio/features/feature-context-menus';
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
})
export class AppIconComponent implements OnInit {
  config = input.required<IApp>();
  id = input.required<string | number>();

  title = computed(() => this.config().name);
  logo = computed(() => this.config().logo || APP_BASE_ICON);

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly dropEventsService: DropEventsService
  ) {}

  ngOnInit(): void {
    this.dropEventsService
      .getEspecificEvent(this.id())
      .subscribe(() => this.elementRef.nativeElement.remove());
  }
}
