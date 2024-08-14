import {
  DestroyRef,
  Directive,
  ElementRef,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IApp } from '@portifolio/utils/util-models';
import { fromEvent } from 'rxjs';
import { SingleSelectedService } from '../../service/single-selected.service';

@Directive({
  selector: '[iconSelected]',
  standalone: true,
  host: {
    '[class.selected]': 'selected()',
  },
})
export class IconSelectedDirective implements OnInit {
  config = input.required<IApp>();
  selected = signal<boolean>(false);

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly singleSelectedService: SingleSelectedService,
  ) {}

  updateVal() {
    const newVal = !this.selected();
    if (newVal) this.singleSelectedService.setUnSelectedAll();
    this.selected.set(newVal);
  }

  ngOnInit(): void {
    this.singleSelectedService.unSelectedAll$$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.selected.set(false));

    fromEvent<Event>(document, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        const target = event.target as HTMLElement;
        const element = this.elementRef.nativeElement;

        if (element.contains(target)) return this.updateVal();

        this.selected.set(false);
      });
  }
}
