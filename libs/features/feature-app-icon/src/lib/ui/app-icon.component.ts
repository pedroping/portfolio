import {
  AfterViewInit,
  Component,
  ElementRef,
  computed,
  input,
} from '@angular/core';
import { IApp } from '@portifolio/utils/util-models';
import { APP_BASE_ICON } from '../mocks/app-mocks';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-icon',
  templateUrl: './app-icon.component.html',
  styleUrls: ['./app-icon.component.scss'],
  standalone: true,
})
export class AppIconComponent implements AfterViewInit {
  config = input.required<IApp>();
  title = computed(() => this.config().name);
  logo = computed(() => this.config().logo || APP_BASE_ICON);

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  onDragStart(event: DragEvent) {
    if (!event.dataTransfer) return;

    const id = this.elementRef.nativeElement.parentElement?.id || '';

    event.dataTransfer.setData(
      'text',
      JSON.stringify({ ...this.config(), parentTargetId: id })
    );
    event.dataTransfer.effectAllowed = 'move';
  }

  ngAfterViewInit(): void {
    fromEvent<DragEvent>(
      this.elementRef.nativeElement.parentElement!,
      'dragover'
    ).subscribe((event) => {
      event.preventDefault();
      event.dataTransfer!.dropEffect = 'move';
    });
  }
}
