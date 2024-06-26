import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FolderSectionActionDirective } from '../../directives/folder-section-action/folder-section-action.directive';
import { ShowHideFolderDirective } from '../../directives/show-hide-folder/show-hide-folder.directive';
import { IFolder } from '../../models/folders-models';

@Component({
  selector: 'folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
  standalone: true,
  imports: [
    NgTemplateOutlet,
    ShowHideFolderDirective,
    FolderSectionActionDirective,
  ],
})
export class FolderComponent {
  root: IFolder[] = [
    {
      title: 'Framework',
      children: [
        {
          title: 'Angular',
          children: [{ title: 'Typescript' }, { title: 'RxJs' }],
        },
        { title: 'Lixo' },
      ],
    },
    {
      title: 'Testing',
      children: [{ title: 'Jest' }, { title: 'Jasmine' }],
    },
  ];
}
