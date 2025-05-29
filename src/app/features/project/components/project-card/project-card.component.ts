import {Component, Input} from '@angular/core';
import {MatCard, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {Project} from '../../models/Project';

@Component({
  selector: 'app-project-card',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  @Input() project!: Project;
}
