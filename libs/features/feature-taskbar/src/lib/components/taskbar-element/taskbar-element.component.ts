import {
  Component,
  DestroyRef,
  HostListener,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
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
import { BASE_ELEMENT_ICON } from '../../mocks/elements-mocks';

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
export class TaskbarElementComponent implements OnInit, OnDestroy, OnChanges {
  element = input.required<IInitialConfig | IBasicElement>();
  config?: IPageConfig;
  elementClass = signal<string>('');

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly taskbarFacade: TaskbarFacade,
    private readonly elementsFacade: ElementsFacade,
    private readonly showElementPreviewDirective: ShowElementPreviewDirective,
  ) {}

  @HostListener('click') onClick() {
    const element = this.element();

    if (!element) return;

    if (this.isInitialConfig(element)) return this.createElement(element);

    this.elementsFacade.validateElementOpened(element.id);
    this.setElementClass();
    this.taskbarFacade.setCloseAll();
  }

  ngOnInit(): void {
    const element = this.element();

    this.setConfig();
    if (this.isInitialConfig(element)) return this.setElementClass();

    this.createConfigObservables();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['element']) {
      const element = this.element();
      this.setConfig();
      if (this.isInitialConfig(element)) return this.setElementClass();
    }
  }

  setConfig() {
    const element = this.element();

    if (this.isInitialConfig(element)) return;

    this.showElementPreviewDirective.setIds(element.id);
    this.config = this.elementsFacade.getElement(element.id);

    if (this.config)
      this.element().icon = this.config.icon || BASE_ELEMENT_ICON;
  }

  createConfigObservables() {
    if (!this.config) return;

    merge(this.config.onMinimize$, this.config.onMaximaze$)
      .pipe(takeUntilDestroyed(this.destroyRef), startWith(undefined))
      .subscribe(() => {
        this.setConfig();
        this.setElementClass();
      });

    this.config.onDestroy$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.destroyElement();
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

  destroyElement() {
    if (
      (this.config?.id || this.config?.id == 0) &&
      this.isInitialConfig(this.element())
    )
      this.taskbarFacade.removeId(this.config.id);
    this.config = undefined;
    this.showElementPreviewDirective.setIds();
  }

  ngOnDestroy(): void {
    this.destroyElement();
  }

  isInitialConfig(
    element: IBasicElement | IInitialConfig,
  ): element is IInitialConfig {
    return !!(element as IInitialConfig).baseSizes;
  }
}
