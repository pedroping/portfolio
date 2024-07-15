import { AsyncPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  effect,
  ElementRef,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContextMenuFacade } from '@portifolio/features/feature-context-menus';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IApp } from '@portifolio/utils/util-models';
import { filter, fromEvent, merge, Subject, take, takeUntil } from 'rxjs';

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
  id = input.required<string | number>();
  input = viewChild<ElementRef<HTMLElement>>('renameInput');

  destroyEvents$ = new Subject<void>();
  showRenameInput$ = new Subject<boolean>();
  renameControl = new FormControl<string>('');

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly contextMenuFacade: ContextMenuFacade<string | number>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
  ) {
    effect(() => {
      const nativeElement = this.input()?.nativeElement;

      this.destroyEvents$.next();
      if (nativeElement) this.setInputsEvents(nativeElement);
    });
  }

  ngOnInit(): void {
    this.title.set(this.config().name ?? '');

    this.renameEvent$.subscribe((event) => {
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
        filter((ev) => ev.key === 'Escape'),
      ),
    ).pipe(take(1), takeUntil(this.destroyEvents$));

    const setEvents = merge(
      fromEvent(input, 'focusout'),
      fromEvent<KeyboardEvent>(input, 'keydown').pipe(
        filter((ev) => ev.key === 'Enter'),
      ),
    ).pipe(take(1), takeUntil(this.destroyEvents$));

    return { cancelEvents, setEvents };
  }

  get renameEvent$() {
    const parentId =
      this.elementRef.nativeElement.parentElement?.parentElement?.id ?? '';

    return this.contextMenuFacade
      .getEventByOption('program-rename', parentId)
      .pipe(
        filter((event) => event.data === this.id()),
        takeUntilDestroyed(this.destroyRef),
      );
  }
}
