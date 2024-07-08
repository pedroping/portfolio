import { Component, Inject, Optional } from '@angular/core';
import { AppDropHandleDirective } from '@portifolio/features/feature-app-icon';
import { DATA_TOKEN, IFolderData } from '@portifolio/utils/util-models';

@Component({
  selector: 'app-holder',
  templateUrl: './app-holder.component.html',
  styleUrls: ['./app-holder.component.scss'],
  standalone: true,
  imports: [AppDropHandleDirective],
})
export class AppHolderComponent {
  id: number;

  constructor(
    @Optional() @Inject(DATA_TOKEN) private readonly data: IFolderData
  ) {
    this.id = data?.folderId ?? 0;
  }
}
