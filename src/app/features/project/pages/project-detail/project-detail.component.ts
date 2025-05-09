import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  SidenavToolbarLayoutComponent
} from '../../../../core/components/sidenav-toolbar-layout/sidenav-toolbar-layout.component';
import {Project} from '../../models/Project';
import {ProjectFirestoreService} from '../../services/project-firestore.service';
import {Observable, of} from 'rxjs';
import {ProjectFormComponent} from '../../components/project-form/project-form.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {TaskFormComponent} from '../../components/task-form/task-form.component';
import {NgForOf} from '@angular/common';
import {TodoCardComponent} from '../../../todo/components/todo-card/todo-card.component';
import {TaskCardComponent} from '../../components/task-card/task-card.component';
import {Task} from '../../models/Task';
import {TaskFirestoreService} from '../../services/task-firestore.service';

@Component({
  selector: 'app-project-detail',
  imports: [
    SidenavToolbarLayoutComponent,
    MatButton,
    MatIcon,
    NgForOf,
    TaskCardComponent,
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent  implements OnInit {
  projId = "";
  project: Observable<Project> = of();

  tasks$: Observable<Task[]> = of([]);
  filteredTasks: Task[] = [];

  filter: 'all' | 'done' | 'open' = 'all';

  constructor(private route: ActivatedRoute,
              private projectFire: ProjectFirestoreService,
              private dialog: MatDialog,
              private taskFire: TaskFirestoreService,
              ) {}

  ngOnInit() {


    this.route.paramMap.subscribe(params => {
      let projektId:string | null;
      projektId = params.get('id');
      if (projektId){
        this.projId = projektId;
        this.project = this.projectFire.getDocById(projektId)
      }else{
        console.error('No projekt found with id ' + projektId);
      }
    });

    this.tasks$ = this.taskFire.getProjectTasks(this.projId)

    this.tasks$.subscribe(tasks => {
      this.applyFilter(tasks);
    })
  }

  openTaskDialog() {
    console.log(this.projId)
    this.dialog.open(TaskFormComponent, { //HIER ÄNBDERN
      width: '40%',
      disableClose: true,
      data: {projectId: this.projId}
    });
  }

  applyFilter(tasks: Task[]){
    switch (this.filter) {
      case 'done':
        this.filteredTasks = tasks.filter(t => t.status);
        break;
      case 'open':
        this.filteredTasks = tasks.filter(t => !t.status);
        break;
      case 'all':
      default:
        this.filteredTasks = tasks;
    }
  }
}
