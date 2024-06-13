import { Directive, HostBinding, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Directive({
  selector: '[actualHour]',
  standalone: true,
})
export class ActualHourDirective implements OnInit {
  @HostBinding('innerHTML') innerHTML = '';
  constructor() {}

  ngOnInit(): void {
    timer(0, 1000).subscribe(() => {
      const hours = new Date().getHours();
      const minutes: number | string = new Date().getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const isMidNight = !!(hours % 12);
      const formatedHours = isMidNight ? hours : 12;
      const fromatedMinutes = minutes < 10 ? '0' + minutes : minutes;
      this.innerHTML = formatedHours + ':' + fromatedMinutes + ' ' + ampm;
    });
  }
}
