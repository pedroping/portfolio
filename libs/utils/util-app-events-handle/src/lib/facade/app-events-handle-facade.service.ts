import { Injectable } from '@angular/core';
import { AppEventsHandleService } from '../service/app-events-handle.service';

@Injectable({ providedIn: 'root' })
export class AppEventsHandleFacade {
  constructor(
    private readonly appEventsHandleService: AppEventsHandleService,
  ) {}

  startDomain() {
    this.appEventsHandleService.startDomain();
  }
}
