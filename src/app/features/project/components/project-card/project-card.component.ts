import {Component, Input} from '@angular/core';
import {MatCard, MatCardTitle} from "@angular/material/card";
import {Project} from '../../models/Project';
import {ProjectFirestoreService} from '../../services/project-firestore.service';
import {UserFirestoreService} from '../../../../core/services/user-firestore.service';

@Component({
  selector: 'app-project-card',
  imports: [
    MatCard,
    MatCardTitle
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  @Input() project!: Project;


  constructor(
    private projectFire: ProjectFirestoreService,
    private userFire: UserFirestoreService,
  ) {}


}
