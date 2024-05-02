import { Component, signal } from '@angular/core';
import { LastZIndexService } from '@portifolio/util/util-z-index-handler';

@Component({
  selector: 'initial-menu',
  templateUrl: './initial-menu.component.html',
  styleUrls: ['./initial-menu.component.scss'],
  standalone: true,
  host: {
    '[style.zIndex]': 'zIndex()',
  },
})
export class InitialMenuComponent {
  zIndex = signal<string>('0');

  constructor(private readonly lastZIndexService: LastZIndexService) {
    this.zIndex.set(this.lastZIndexService.createNewZIndex());
  }
}
