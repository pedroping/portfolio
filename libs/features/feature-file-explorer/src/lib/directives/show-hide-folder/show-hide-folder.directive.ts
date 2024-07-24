import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  contentChild,
  effect,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BuildAnimation } from '@portifolio/utils/util-animations';
import { Subject, fromEvent, takeUntil } from 'rxjs';

@Directive({
  selector: '[showHideFolder]',
  standalone: true,
})
export class ShowHideFolderDirective implements AfterViewInit {
  state = signal<boolean>(true);
  title = input<string>('');
  folderContent = input<HTMLElement | undefined | null>();
  folderToggle = contentChild<ElementRef<HTMLElement>>('folderToggle');
  folderContentSelected =
    contentChild<ElementRef<HTMLElement>>('folderContent');

  destroySubscribers$ = new Subject<void>();

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly buildAnimation: BuildAnimation,
  ) {
    effect(() => {
      this.destroySubscribers$.next();
      this.createEvents();
    });
  }

  ngAfterViewInit() {
    this.destroySubscribers$.next();
    this.createEvents();
  }

  createEvents() {
    if (!this.toggle || !this.content) return;

    fromEvent(this.toggle, 'click')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        takeUntil(this.destroySubscribers$),
      )
      .subscribe(() => {
        this.state.update((val) => !val);

        if (!this.content) return;

        if (this.state()) {
          this.content.style.display = 'block';
          this.buildAnimation.animate('reverseEnterAnimationY', this.content);
          return;
        }

        this.buildAnimation
          .animate('reverseLeaveAnimationY', this.content)
          .subscribe(() => {
            if (!this.content) return;
            this.content.style.display = 'none';
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
