import { Directive, signal } from '@angular/core';

@Directive({
  selector: '[createFoldersSection]',
  standalone: true,
  host: {
    '[class.selected]': 'active()',
  },
})
export class CreateFoldersSectionDirective {
  active = signal<Boolean>(false);

  constructor() {}
}
