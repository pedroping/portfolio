import { Directive, ElementRef, input, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { AppCopyAndPasteFacade } from '../../facade/app-copy-and-paste-facade.service';

@Directive({
  selector: '[selectLastFolder]',
  standalone: true,
})
export class SelectLastFolderDirective implements OnInit {
  folderId = input.required<number>();
  parentId = input.required<string>();

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly appCopyAndPasteFacade: AppCopyAndPasteFacade,
  ) {}

  ngOnInit(): void {
    const element = this.elementRef.nativeElement.parentElement;

    if (!element) return;

    fromEvent(element, 'click').subscribe(() => this.onClick());
  }

  onClick() {
    this.appCopyAndPasteFacade.setSelectedFolder(this.folderId());
  }
}
