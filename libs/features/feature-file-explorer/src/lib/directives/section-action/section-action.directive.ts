import {
  DestroyRef,
  Directive,
  HostListener,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FileExplorerFacade } from '../../facade/file-explorer-facade.service';

@Directive({
  selector: '[sectionAction]',
  standalone: true,
  host: {
    '[class.selected]': 'active()',
  },
})
export class SectionActionDirective implements OnInit {
  active = signal<boolean>(false);
  eventType = input.required<'folder' | 'adress'>({
    alias: 'sectionAction',
  });

  @HostListener('click') onClick() {
    if (this.eventType() == 'folder')
      return this.fileExplorerFacade.toggleFolderState();

    this.fileExplorerFacade.toggleAdressState();
  }

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly fileExplorerFacade: FileExplorerFacade,
  ) {}

  ngOnInit(): void {
    const event$ =
      this.eventType() == 'folder'
        ? this.fileExplorerFacade.folderState$$
        : this.fileExplorerFacade.adressState$$;

    event$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => this.active.set(state));
  }
}
