import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { IBasicElement } from '@portifolio/utils/util-models';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { ShowElementPreviewDirective } from '../../directives/show-element-preview/show-element-preview.directive';
import { TaskbarFacade } from '../../facades/taskbar-facade.service';
import { FIXED_ICONS } from '../../mocks/fixed-icons';
import { TaskbarElementComponent } from '../taskbar-element/taskbar-element.component';
@Component({
  selector: 'pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.scss'],
  standalone: true,
  imports: [AsyncPipe, ShowElementPreviewDirective, TaskbarElementComponent],
})
export class PagesListComponent implements OnInit {
  private basicElements$ = new BehaviorSubject<IBasicElement[]>([]);
  basicElements$$ = this.basicElements$.asObservable();

  fixedElements = FIXED_ICONS;

  constructor(
    private readonly taskbarFacade: TaskbarFacade,
    private readonly elementsFacade: ElementsFacade,
  ) {}

  ngOnInit(): void {
    this.elementsFacade.basicElements$
      .pipe(
        switchMap((elements) =>
          this.taskbarFacade.hideFixed$$.pipe(
            map((ids) =>
              elements.filter((element) => !ids.includes(element.id)),
            ),
          ),
        ),
      )
      .subscribe((elements) => {
        this.basicElements$.next(elements);
      });
  }
}
