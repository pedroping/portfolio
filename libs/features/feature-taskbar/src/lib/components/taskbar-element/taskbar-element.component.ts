import {
  Component,
  DestroyRef,
  HostListener,
  OnInit,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import {
  IBasicElement,
  IInitialConfig,
  IPageConfig,
} from '@portifolio/utils/util-models';
import { merge, startWith } from 'rxjs';
import { ShowElementPreviewDirective } from '../../directives/show-element-preview/show-element-preview.directive';
import { TaskbarFacade } from '../../facades/taskbar-facade.service';

@Component({
  selector: 'taskbar-element',
  templateUrl: './taskbar-element.component.html',
  styleUrls: ['./taskbar-element.component.scss'],
  standalone: true,
  hostDirectives: [
    { directive: ShowElementPreviewDirective, inputs: ['element'] },
  ],
  host: {
    '[class]': 'elementClass()',
  },
})
export class TaskbarElementComponent implements OnInit {
  element = input.required<IInitialConfig | IBasicElement>();
  config?: IPageConfig;
  elementClass = signal<string>('');

  @HostListener('click') onClick() {
    const element = this.element();

    if (!element) return;

    if (this.isInitialConfig(element)) return this.createElement(element);

    this.elementsFacade.validateElementOpened(element.id);
    this.taskbarFacade.setCloseAll();
  }

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly taskbarFacade: TaskbarFacade,
    private readonly elementsFacade: ElementsFacade,
    private readonly showElementPreviewDirective: ShowElementPreviewDirective,
  ) {}

  ngOnInit(): void {
    const element = this.element();

    if (this.isInitialConfig(element)) return this.setElementClass();

    this.showElementPreviewDirective.setIds(element.id);

    merge(element.onMinimize$, element.onMaximaze$)
      .pipe(takeUntilDestroyed(this.destroyRef), startWith(undefined))
      .subscribe(() => this.setElementClass());
  }

  createConfigObservables() {
    if (!this.config) return;

    merge(this.config.onMinimize$, this.config.onMaximaze$)
      .pipe(takeUntilDestroyed(this.destroyRef), startWith(undefined))
      .subscribe(() => this.setElementClass());

    this.config.onDestroy$.subscribe(() => {
      if (this.config?.id || this.config?.id == 0)
        this.taskbarFacade.removeId(this.config.id);
      this.config = undefined;
      this.showElementPreviewDirective.setIds();
      this.elementClass.set('fixed-element');
    });
  }

  setElementClass() {
    const element = this.element();

    if (!element) return this.elementClass.set('');

    if (this.isInitialConfig(element)) {
      if (!this.config) return this.elementClass.set('fixed-element');

      this.elementClass.set(this.config.opened ? 'opened' : 'minimized');
      return;
    }

    this.elementClass.set(element.opened ? 'opened' : 'minimized');
  }

  createElement(element: IInitialConfig) {
    if (!this.config) {
      this.config = this.elementsFacade.createElement({}, element);
      this.taskbarFacade.setNew(this.config.id);
      this.showElementPreviewDirective.setIds(this.config.id);
      this.createConfigObservables();
      return;
    }

    this.elementsFacade.validateElementOpened(this.config.id);
  }

  isInitialConfig(
    element: IBasicElement | IInitialConfig,
  ): element is IInitialConfig {
    return !!(element as IInitialConfig).baseSizes;
  }
}
