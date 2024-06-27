import { DestroyRef, Directive, OnInit, ViewContainerRef } from '@angular/core';
import { FileExplorerFacade } from '../../facade/file-explorer-facade.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';
import { FoldersComponent } from '../../components/folders/folders.component';
import { BuildAnimation } from '@portifolio/utils/util-animations';

@Directive({
  selector: 'createFoldersSection',
  standalone: true,
})
export class CreateFoldersSectionDirective implements OnInit {
  lastView?: HTMLElement;

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly destroyRef: DestroyRef,
    private readonly buildAnimation: BuildAnimation,
    private readonly fileExplorerFacade: FileExplorerFacade
  ) {}

  ngOnInit(): void {
    this.fileExplorerFacade.menuState$$
      .pipe(
        startWith(this.fileExplorerFacade.menuState),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((val) => {
        if (val) {
          this.vcr.clear();
          this.lastView = this.vcr.createComponent(FoldersComponent).location
            .nativeElement as HTMLElement;
          this.buildAnimation.animate('enterAnimationX', this.lastView);

          return;
        }

        if (!this.lastView) return this.vcr.clear();

        this.buildAnimation
          .animate('leaveAnimationX', this.lastView)
          .subscribe(() => this.vcr.clear());
      });
  }
}
