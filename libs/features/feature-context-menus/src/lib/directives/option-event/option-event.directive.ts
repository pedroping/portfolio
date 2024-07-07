import {
  AfterViewInit,
  DestroyRef,
  Directive,
  contentChildren,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { ContextMenuFacade } from '../../facade/context-menu-facade.service';
import { OptionDirective } from '../option/option.directive';

@Directive({
  selector: '[optionEvent]',
  standalone: true,
})
export class OptionEventDirective<T> implements AfterViewInit {
  data = input<T | undefined>(undefined, { alias: 'optionEvent' });
  options = contentChildren(OptionDirective);

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly contextMenuFacade: ContextMenuFacade<T>
  ) {}

  ngAfterViewInit(): void {
    const optionsEvents = this.options().map((option) => option.onClick$$);

    merge(...optionsEvents)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        this.contextMenuFacade.setOptionSelected(event, this.data());
        this.contextMenuFacade.setClearDefault();
      });
  }
}
