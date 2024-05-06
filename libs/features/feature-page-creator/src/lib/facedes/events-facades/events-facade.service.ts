import { Injectable } from '@angular/core';
import { PageEvents } from '../../services/page-events/page-events.service';

@Injectable({ providedIn: 'root' })
export class EventsFacade {
  constructor(private readonly pageEvents: PageEvents) {}

  setChangeZIndex() {
    this.pageEvents.setChangeZIndex();
  }

  get changeZIndex$$() {
    return this.pageEvents.changeZIndex$$;
  }
}
