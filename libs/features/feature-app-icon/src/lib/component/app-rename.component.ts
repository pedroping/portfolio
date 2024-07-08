import { AsyncPipe } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IBasicApp, IOptionEvent } from '@portifolio/utils/util-models';
import { fromEvent, Observable, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-rename',
  templateUrl: './app-rename.component.html',
  styleUrls: ['./app-rename.component.scss'],
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, FormsModule],
})
export class AppRenameComponent implements OnInit {
  title = signal<string>('');
  config = input.required<IBasicApp>();
  input = viewChild<ElementRef<HTMLElement>>('renameInput');
  renameEvent$ = input.required<Observable<IOptionEvent<string | number>>>();

  showRenameInput$ = new Subject<boolean>();
  renameControl = new FormControl<string>('');

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    effect(() => {
      const nativeElement = this.input()?.nativeElement;

      if (nativeElement) this.setInputsEvents(nativeElement);
    });
  }

  ngOnInit(): void {
    const title = this.config().name;
    if (title) this.title.set(title);

    this.renameEvent$().subscribe((event) => {
      if (event) this.showRenameInput$.next(true);
    });
  }

  setInputsEvents(input: HTMLElement) {
    input.focus();
    this.renameControl.setValue(this.title());

    fromEvent(input, 'focusout')
      .pipe(take(1))
      .subscribe(() => this.setEvent());

    fromEvent(this.elementRef.nativeElement, 'dragstart')
      .pipe(take(1))
      .subscribe(() => this.cancelEvent());

    fromEvent<KeyboardEvent>(input, 'keydown')
      .pipe(takeUntil(this.showRenameInput$))
      .subscribe((event) => {
        if (event.key == 'Enter') this.setEvent();
        if (event.key == 'Escape') this.cancelEvent();
      });
  }

  cancelEvent() {
    this.renameControl.reset();
    this.showRenameInput$.next(false);
  }

  setEvent() {
    const inputValue = this.renameControl.value;
    if (inputValue) this.title.set(inputValue);
    this.config().name = this.title();
    this.renameControl.reset();
    this.showRenameInput$.next(false);
  }
}
