import { DestroyRef, Directive, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[workspaceEvents]',
  standalone: true,
})
export class WorkspaceEventsDirective implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    fromEvent<KeyboardEvent>(document, 'keyup')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (!event.shiftKey) return;

        if (event.key.toLocaleLowerCase() == 'l') {
          this.router.navigate(['/login'], {
            queryParams: { noSplash: true },
            replaceUrl: true,
          });

          return;
        }
      });
  }
}
