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
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IApp, IOptionEvent } from '@portifolio/utils/util-models';
import {
  filter,
  fromEvent,
  merge,
  Observable,
  Subject,
  take,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-rename',
  templateUrl: './app-rename.component.html',
  styleUrls: ['./app-rename.component.scss'],
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, FormsModule],
})
export class AppRenameComponent implements OnInit {
  title = signal<string>('');
  config = input.required<IApp>();
  input = viewChild<ElementRef<HTMLElement>>('renameInput');
  renameEvent$ = input.required<Observable<IOptionEvent<string | number>>>();

  destroyEvents$ = new Subject<void>();
  showRenameInput$ = new Subject<boolean>();
  renameControl = new FormControl<string>('');

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade
  ) {
    effect(() => {
      const nativeElement = this.input()?.nativeElement;

      this.destroyEvents$.next();
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

    const { cancelEvents, setEvents } = this.getInputEvents(input);

    setEvents.subscribe(() => this.setEvent());
    cancelEvents.subscribe(() => this.cancelEvent());
  }

  cancelEvent() {
    this.renameControl.reset();
    this.showRenameInput$.next(false);
  }

  setEvent() {
    this.destroyEvents$.next();

    const isFolderId = this.config().isFolderId;
    const inputValue = this.renameControl.value;

    if (inputValue) this.title.set(inputValue);

    if (isFolderId || isFolderId === 0)
      this.foldersHierarchyFacade.renameFolder(isFolderId, this.title());

    this.foldersHierarchyFacade.renameFile(this.config().id, this.title());

    this.renameControl.reset();
    this.showRenameInput$.next(false);
  }

  getInputEvents(input: HTMLElement) {
    const cancelEvents = merge(
      fromEvent(this.elementRef.nativeElement, 'dragstart'),
      fromEvent<KeyboardEvent>(input, 'keydown').pipe(
        filter((ev) => ev.key === 'Escape')
      )
    ).pipe(take(1), takeUntil(this.destroyEvents$));

    const setEvents = merge(
      fromEvent(input, 'focusout'),
      fromEvent<KeyboardEvent>(input, 'keydown').pipe(
        filter((ev) => ev.key === 'Enter')
      )
    ).pipe(take(1), takeUntil(this.destroyEvents$));

    return { cancelEvents, setEvents };
  }
}
