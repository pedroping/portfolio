import { Directive, OnInit, ViewContainerRef, output } from '@angular/core';
import { BuildAnimation } from '@portifolio/utils/util-animations';
import { switchMap, take, timer } from 'rxjs';
import { UiSplashScreenComponent } from '../components/ui-splash-screen/ui-splash-screen.component';

@Directive({
  selector: '[showLodingScreen]',
  standalone: true,
})
export class ShowScreenDirective implements OnInit {
  afterClosed = output<void>();

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly buildAnimation: BuildAnimation
  ) {}

  ngOnInit(): void {
    const { location } = this.vcr.createComponent(UiSplashScreenComponent);

    timer(5000)
      .pipe(
        take(1),
        switchMap(() =>
          this.buildAnimation.animate('leaveOpacity', location.nativeElement)
        )
      )
      .subscribe(() => {
        this.vcr.clear();
        this.afterClosed.emit();
      });
  }
}
