import { Directive, Inject, OnInit, ViewContainerRef } from '@angular/core';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';

@Directive({
  selector: '[pageContent]',
  standalone: true,
})
export class PageContentDirective implements OnInit {
  constructor(
    readonly vcr: ViewContainerRef,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  ngOnInit(): void {
    this.vcr.createComponent(this._config.pageContent);
  }
}
