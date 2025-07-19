import {
  Directive,
  Inject,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { CONFIG_TOKEN, IPageConfig } from '@portifolio/utils/util-models';

@Directive({
  selector: '[pageTemplateRef]',
})
export class PageTemplateRefDirective implements OnInit {
  constructor(
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig,
    private readonly tmp: TemplateRef<unknown>,
    private readonly vcr: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    this._config.templateRef = this.tmp;

    this.vcr.createEmbeddedView(this.tmp);
  }
}
