import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  contentChild,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BuildAnimation } from '@portifolio/utils/util-animations';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[showHideFolder]',
  standalone: true,
})
export class ShowHideFolderDirective implements AfterViewInit {
  state = signal<Boolean>(true);
  title = input<string>('');
  folderContent = input<HTMLElement | undefined | null>();
  folderToggle = contentChild<ElementRef<HTMLElement>>('folderToggle');
  folderContentSelected =
    contentChild<ElementRef<HTMLElement>>('folderContent');

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly buildAnimation: BuildAnimation
  ) {}

  ngAfterViewInit(): void {
    if (!this.toggle || !this.content) return;

    fromEvent(this.toggle, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.state.update((val) => !val);

        if (this.state()) {
          this.content!.style.display = 'block';
          this.buildAnimation.animate('reverseEnterAnimationY', this.content!);

          return;
        }

        this.buildAnimation
          .animate('reverseLeaveAnimationY', this.content!)
          .subscribe(() => {
            this.content!.style.display = 'none';
          });
      });
  }

  get toggle() {
    return this.folderToggle()?.nativeElement;
  }

  get content() {
    return this.folderContent() ?? this.folderContentSelected()?.nativeElement;
  }
}
