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

    timer(5000)
      .pipe(take(1))
      .subscribe(() => {
        this.vcr.clear();
        this.buildAnimation.animate('leaveOpacity', location.nativeElement);
      });
  }
}
