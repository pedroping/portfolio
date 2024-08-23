import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ALL_FILES,
  ALL_FILES_FOLDER_ID,
  GITHUB_PROGRAM,
  LINKEDIN_PROGRAM,
  PROGRAM_1_CONFIG,
  PROGRAM_2_CONFIG,
  PROGRAM_3_CONFIG,
  PROGRAM_4_CONFIG,
  REPOSITORY_PROGRAM,
} from '../../mocks/program-mocks';
import { ProgramComponent } from '../program/program.component';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { IFolderData } from '@portifolio/utils/util-models';
import { MenuEventsFacade } from '../../facades/menu-events-facade';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';

@Component({
  selector: 'menu-favorites',
  templateUrl: './menu-favorites.component.html',
  styleUrls: ['./menu-favorites.component.scss'],
  standalone: true,
  imports: [ProgramComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuFavoritesComponent {
  programMocks = [
    PROGRAM_1_CONFIG,
    PROGRAM_2_CONFIG,
    PROGRAM_3_CONFIG,
    PROGRAM_4_CONFIG,
    GITHUB_PROGRAM,
    LINKEDIN_PROGRAM,
    REPOSITORY_PROGRAM,
  ];

  constructor(
    private readonly menuEventsFacade: MenuEventsFacade,
    private readonly elementsFacade: ElementsFacade<IFolderData>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
  ) {}

  openAllPrograms() {
    this.menuEventsFacade.setCloseMenu();
    this.foldersHierarchyFacade.deleteFilesByFolder(ALL_FILES_FOLDER_ID);
    
    ALL_FILES.forEach((file) => {
      this.foldersHierarchyFacade.setNewFile(file);
    });

    this.elementsFacade.createElement(
      { folderId: ALL_FILES_FOLDER_ID },
      PROGRAM_2_CONFIG.config,
    );
  }
}
