import {
  computed,
  contentChild,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, Subject, take } from 'rxjs';

@Directive({
  selector: '[showHideFolder]',
  exportAs: 'showHideFolder',
  standalone: true,
})
export class ShowHideFolderDirective implements OnInit {
  private state = signal<boolean>(true);
  animationKey = computed(() => (this.state() ? 'open' : 'closed'));
  private folderToggle = contentChild<ElementRef<HTMLElement>>('folderToggle', {
    descendants: true,
  });

  createSubscriptions$ = new Subject<void>();

  constructor(private readonly destroyRef: DestroyRef) {
    effect(() => {
      const toggle = this.folderToggle();
      const nativeElement = toggle?.nativeElement;
      if (nativeElement) this.createSubscriptions$.next();
    });
  }

  ngOnInit(): void {
    const toggle = this.folderToggle()?.nativeElement;

    this.createSubscriptions$
      .pipe(take(1))
      .subscribe(() => this.createToggleSubscription());

    if (toggle) this.createSubscriptions$.next();
  }

  private createToggleSubscription() {
    const toggle = this.folderToggle()?.nativeElement;

    if (!toggle) return;

    fromEvent(toggle, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.state.update((val) => !val));
  }
}
