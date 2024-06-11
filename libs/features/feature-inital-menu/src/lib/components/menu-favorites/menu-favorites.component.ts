import { Component } from '@angular/core';
import {
  GITHUB_PROGRAM,
  LINKEDIN_PROGRAM,
  PROGRAM_1_CONFIG,
  PROGRAM_2_CONFIG,
  REPOSITORY_PROGRAM,
} from '../../mocks/program-mocks';
import { ProgramComponent } from '../program/program.component';

@Component({
  selector: 'menu-favorites',
  templateUrl: './menu-favorites.component.html',
  styleUrls: ['./menu-favorites.component.scss'],
  standalone: true,
  imports: [ProgramComponent],
})
export class MenuFavoritesComponent {
  program1Config = PROGRAM_1_CONFIG;
  program2Config = PROGRAM_2_CONFIG;
  gitHubProgram = GITHUB_PROGRAM;
  linkedinProgram = LINKEDIN_PROGRAM;
  repositoryProgram = REPOSITORY_PROGRAM;
}
