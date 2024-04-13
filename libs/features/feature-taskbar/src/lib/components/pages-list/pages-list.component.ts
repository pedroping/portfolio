import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ElementsFacede } from '@portifolio/features/feature-page-creator';
@Component({
  selector: 'pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export class PagesListComponent {
  basicElements$ = this.elementsFacede.basicElements$;

  constructor(private readonly elementsFacede: ElementsFacede) {}

  handelElementClick(id: number) {
    this.elementsFacede.openElement(id);
  }
}
