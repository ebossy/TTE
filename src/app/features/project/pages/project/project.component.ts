import {Component, OnInit} from '@angular/core';
import {
  SidenavToolbarLayoutComponent
} from '../../../../core/components/sidenav-toolbar-layout/sidenav-toolbar-layout.component';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {ProjectCardComponent} from '../../components/project-card/project-card.component';
import {NgForOf} from '@angular/common';
import {ProjectFirestoreService} from '../../services/project-firestore.service';
import {UserFirestoreService} from '../../../../core/services/user-firestore.service';
import {Project} from '../../models/Project';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {EventFormComponent} from '../../../event/components/event-form/event-form.component';
import {MatDialog} from '@angular/material/dialog';
import {ProjectFormComponent} from '../../components/project-form/project-form.component';

@Component({
  selector: 'app-project',
  imports: [
    SidenavToolbarLayoutComponent,
    MatButton,
    MatIcon,
    ProjectCardComponent,
    NgForOf,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})

export class ProjectComponent implements OnInit{

  constructor(
    private projectFire: ProjectFirestoreService,
    private userFire: UserFirestoreService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  project$: Observable<Project[]> = of([]);

  filteredProjects: Project[] = [];

  test(){
    console.log('test');
  }

  async ngOnInit(){
    this.project$ = await this.projectFire.getUserProjects();

    this.project$.subscribe(project => {
      this.appyFilter(project);
    })
  }

  //Noch kein FIlter nötig
  async appyFilter(project: Project[]) {
    this.filteredProjects = project;
  }

  navigateTo(url: string) {
    this.router.navigate([`project/${url}`]);
  }

  openEventDialog() {
    this.dialog.open(ProjectFormComponent, {
      width: '40%',
      disableClose: true
    });

  }
}
