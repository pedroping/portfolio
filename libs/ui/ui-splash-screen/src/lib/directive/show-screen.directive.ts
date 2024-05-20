import { Directive, OnInit, ViewContainerRef } from '@angular/core';
import { BuildAnimation } from '@portifolio/utils/util-animations';
import { switchMap, take, timer } from 'rxjs';
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
        '';
      }
    );

    timer(5000)
      .pipe(
        take(1),
        switchMap(() =>
          this.buildAnimation.animate('leaveOpacity', location.nativeElement)
        )
      )
      .subscribe(() => {
        this.vcr.clear();
        const audio = new Audio('/assets/audios/videoplayback.m4a');
        audio.load();
        audio.play();
      });
  }
}
