import { Directive, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { take } from 'rxjs';
import { AVAILABLE_ROUTES } from '../mocks/routes-enum';

@Directive({
  selector: '[preventTurnOffOninit]',
  standalone: true,
})
export class PreventTurnOffOninitDirective implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(take(1)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url == '/' + AVAILABLE_ROUTES.TURN_OFF)
          this.router.navigateByUrl('', { replaceUrl: true });
      }
    });
  }
}
