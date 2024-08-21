import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'turn-off',
  templateUrl: './turn-off.component.html',
  styleUrls: ['./turn-off.component.scss'],
  standalone: true,
})
export class TurnOffComponent {
  constructor(private readonly router: Router) {}

  @HostListener('keydown')
  @HostListener('click')
  onClick() {
    this.router.navigateByUrl('/login');
  }
}
