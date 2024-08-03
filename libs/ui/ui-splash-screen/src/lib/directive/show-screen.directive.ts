import { Directive, OnInit, ViewContainerRef } from '@angular/core';
import { BuildAnimation } from '@portifolio/utils/util-animations';
import { take, timer } from 'rxjs';

@Directive({
  selector: '[showLodingScreen]',
  standalone: true,
})
export class ShowScreenDirective implements OnInit {
  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly buildAnimation: BuildAnimation,
  ) {}

  async ngOnInit() {
    const component = await import(
      '../components/ui-splash-screen/ui-splash-screen.component'
    ).then((c) => c.UiSplashScreenComponent);

    const { location } = this.vcr.createComponent(component);

    (location.nativeElement as HTMLElement).addEventListener(
      'mousemove',
      () => {
        ('');
      },
    );
    this.htmlElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    timer(5000)
      .pipe(take(1))
      .subscribe(() => {
        this.vcr.clear();
        this.buildAnimation.animate('leaveOpacity', location.nativeElement);
        this.htmlElement.style.overflow = '';
        document.body.style.overflow = '';
      });
  }

  get htmlElement() {
    return document.querySelector('html') as HTMLElement;
  }
}
