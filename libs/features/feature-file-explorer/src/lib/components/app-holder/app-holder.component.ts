import { Component, Inject } from '@angular/core';
import { AppDropHandleDirective } from '@portifolio/features/feature-app-icon';
import { DATA_TOKEN } from '@portifolio/features/feature-page-creator';
import { IFolderData } from '../../models/folders-models';

@Component({
  selector: 'app-holder',
  templateUrl: './app-holder.component.html',
  styleUrls: ['./app-holder.component.scss'],
  standalone: true,
  imports: [AppDropHandleDirective],
})
export class AppHolderComponent {
  id: number;

  constructor(@Inject(DATA_TOKEN) private readonly data: IFolderData) {
    this.id = data.folderId;
  }
}
