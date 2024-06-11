import { Directive, OnInit, ViewContainerRef } from '@angular/core';
import { BuildAnimation } from '@portifolio/utils/util-animations';
import { take, timer } from 'rxjs';
import { UiSplashScreenComponent } from '../components/ui-splash-screen/ui-splash-screen.component';

@Directive({
  selector: '[showLodingScreen]',
  standalone: true,
})
export class ShowScreenDirective implements OnInit {
  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly buildAnimation: BuildAnimation
  ) {}

  ngOnInit(): void {
    const { location } = this.vcr.createComponent(UiSplashScreenComponent);

    (location.nativeElement as HTMLElement).addEventListener(
      'mousemove',
      () => {
        ('');
      }
    );
    this.htmlElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    timer(5000)
      .pipe(take(1))
      .subscribe(() => {
        this.vcr.clear();
        this.buildAnimation.animate('leaveOpacity', location.nativeElement);
        this.htmlElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
      });
  }

  get htmlElement() {
    return document.querySelector('html') as HTMLElement;
  }
}
