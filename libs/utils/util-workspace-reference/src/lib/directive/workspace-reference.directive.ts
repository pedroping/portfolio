import { Directive, ElementRef, OnInit, ViewContainerRef } from '@angular/core';
import { WorkspaceReferenceFacade } from '../facade/workspace-reference-facade.service';

@Directive({
  selector: 'workspace-reference',
  standalone: true,
})
export class WorkspaceReferenceDirective implements OnInit {
  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly workspaceReferenceFacade: WorkspaceReferenceFacade,
  ) {
    this.workspaceReferenceFacade.setVcr(this.vcr);
  }

  ngOnInit() {
    this.workspaceReferenceFacade.setElement(
      this.elementRef.nativeElement.parentElement ??
        this.elementRef.nativeElement,
    );
  }
}
