import {
  DestroyRef,
  Directive,
  input,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  BuildAnimation,
  IAvailableAnimations,
} from '@portifolio/utils/util-animations';
import { startWith } from 'rxjs';
import { ExplorerAdressComponent } from '../../components/explorer-adress/explorer-adress.component';
import { FoldersComponent } from '../../components/folders/folders.component';
import { FileExplorerFacade } from '../../facade/file-explorer-facade.service';

@Directive({
  selector: 'createSection',
  standalone: true,
})
export class CreateSectionDirective implements OnInit {
  lastView?: HTMLElement;
  eventType = input.required<'folder' | 'adress'>();

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly destroyRef: DestroyRef,
    private readonly buildAnimation: BuildAnimation,
    private readonly fileExplorerFacade: FileExplorerFacade,
  ) {}

  ngOnInit(): void {
    const { event$, event, enterAnimation, leaveAnimation, component } =
      this.allParameters;

    event$
      .pipe(startWith(event), takeUntilDestroyed(this.destroyRef))
      .subscribe((val) => {
        if (val) {
          this.vcr.clear();
          this.lastView = this.vcr.createComponent(component).location
            .nativeElement as HTMLElement;
          this.buildAnimation.animate(enterAnimation, this.lastView);

          return;
        }

        if (!this.lastView) return this.vcr.clear();

        this.buildAnimation
          .animate(leaveAnimation, this.lastView)
          .subscribe(() => this.vcr.clear());
      });
  }

  get allParameters() {
    const event$ =
      this.eventType() == 'folder'
        ? this.fileExplorerFacade.folderState$$
        : this.fileExplorerFacade.adressState$$;
    const event =
      this.eventType() == 'folder'
        ? this.fileExplorerFacade.folderState
        : this.fileExplorerFacade.adressState;

    const enterAnimation: IAvailableAnimations =
      this.eventType() == 'folder'
        ? 'enterAnimationX'
        : 'reverseEnterAnimationY';
        
    const leaveAnimation: IAvailableAnimations =
      this.eventType() == 'folder'
        ? 'leaveAnimationX'
        : 'reverseLeaveAnimationY';

    const component: Type<unknown> =
      this.eventType() == 'folder' ? FoldersComponent : ExplorerAdressComponent;

    return { event$, event, enterAnimation, leaveAnimation, component };
  }
}
