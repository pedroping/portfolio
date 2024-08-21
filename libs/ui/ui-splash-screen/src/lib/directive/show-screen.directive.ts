import { Directive, input, OnInit, ViewContainerRef } from '@angular/core';
import { BuildAnimation } from '@portifolio/utils/util-animations';
import { take, timer } from 'rxjs';
import { TAvailableScreens } from '@portifolio/utils/util-models';

@Directive({
  selector: '[showLodingScreen]',
  standalone: true,
})
export class ShowScreenDirective implements OnInit {
  type = input.required<TAvailableScreens>();

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly buildAnimation: BuildAnimation,
  ) {}

  async ngOnInit() {
    const component = await this.getComponent();

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

  getComponent() {
    const loginComponent = import(
      '../ui/ui-login-splash-screen/ui-login-splash-screen.component'
    ).then((c) => c.UiLoginSplashScreenComponent);

    const turnOffComponent = import(
      '../ui/ui-turn-off-splash-screen/ui-turn-off-splash-screen.component'
    ).then((c) => c.UiTurnOffSplashScreenComponent);

    return this.type() == 'login' ? loginComponent : turnOffComponent;
  }
}
