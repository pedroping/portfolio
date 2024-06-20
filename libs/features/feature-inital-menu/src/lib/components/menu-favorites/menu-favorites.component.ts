import { Component } from '@angular/core';
import {
  GITHUB_PROGRAM,
  LINKEDIN_PROGRAM,
  PROGRAM_1_CONFIG,
  PROGRAM_2_CONFIG,
  PROGRAM_3_CONFIG,
  PROGRAM_4_CONFIG,
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
  programMocks = [
    PROGRAM_1_CONFIG,
    PROGRAM_2_CONFIG,
    PROGRAM_3_CONFIG,
    PROGRAM_4_CONFIG,
    GITHUB_PROGRAM,
    LINKEDIN_PROGRAM,
    REPOSITORY_PROGRAM,
  ];
}
