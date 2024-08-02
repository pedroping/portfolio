import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  output,
  viewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'new-app',
  templateUrl: './new-app.component.html',
  styleUrls: ['./new-app.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
  host: {
    '[draggable]': 'false',
  },
})
export class NewAppComponent implements AfterViewInit {
  createEvent = output<string>();
  input = viewChild<ElementRef<HTMLInputElement>>('input');
  newFolderControl = new FormControl<string>('', { nonNullable: true });

  constructor() {
    effect(() => {
      const input = this.input();
      input?.nativeElement.focus();
    });
  }

  ngAfterViewInit(): void {
    const input = this.input();
    input?.nativeElement.focus();
  }

  sendEvent() {
    const value = this.newFolderControl.value;
    this.createEvent.emit(value);
  }
}
