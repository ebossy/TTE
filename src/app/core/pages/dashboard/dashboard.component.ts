import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatCheckbox} from '@angular/material/checkbox';
import {Router} from '@angular/router';

import {SidenavToolbarLayoutComponent} from '../../components/sidenav-toolbar-layout/sidenav-toolbar-layout.component';
import {Observable, of} from 'rxjs';
import {EventTTE} from '../../../features/event/models/EventTTE';
import {EventFirestoreService} from '../../../features/event/services/event-firestore.service';
import {ProjectFirestoreService} from '../../../features/project/services/project-firestore.service';
import {TodoFirestoreService} from '../../../features/todo/services/todo-firestore.service';
import {Project} from '../../../features/project/models/Project';
import {Todo} from '../../../features/todo/models/Todo';
import {AsyncPipe, NgForOf} from '@angular/common';
import {EventCardComponent} from '../../../features/event/components/event-card/event-card.component';
import {TodoCardComponent} from '../../../features/todo/components/todo-card/todo-card.component';
import {ProjectCardComponent} from '../../../features/project/components/project-card/project-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    SidenavToolbarLayoutComponent,
    NgForOf,
    AsyncPipe,
    EventCardComponent,
    TodoCardComponent,
    ProjectCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  constructor(
    private router: Router,
    private eventFire: EventFirestoreService,
    private projectFire: ProjectFirestoreService,
    private todoFire: TodoFirestoreService
    ) {}

  eventTTE$: Observable<EventTTE[]> = of([]);
  projects$: Observable<Project[]> = of([]);
  todos$: Observable<Todo[]> = of([])


  async ngOnInit() {
    this.eventTTE$ = await this.eventFire.getUserEvents();
    this.projects$ = await  this.projectFire.getUserProjects();
    this.todos$ = await this.todoFire.getUserTodos();

  }

  navigateTo(page:string){
    this.router.navigate([`/${page}`]);
  }

}
