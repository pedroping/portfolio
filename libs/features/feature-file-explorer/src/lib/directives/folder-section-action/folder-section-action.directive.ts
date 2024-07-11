import {
  DestroyRef,
  Directive,
  HostListener,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FileExplorerFacade } from '../../facade/file-explorer-facade.service';

@Directive({
  selector: '[folderSectionAction]',
  standalone: true,
  host: {
    '[class.selected]': 'active()',
  },
})
export class FolderSectionActionDirective implements OnInit {
  active = signal<Boolean>(false);

  @HostListener('click') onClick() {
    this.fileExplorerFacade.toggleState();
  }

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly fileExplorerFacade: FileExplorerFacade,
  ) {}

  ngOnInit(): void {
    this.fileExplorerFacade.menuState$$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => this.active.set(state));
  }
}
