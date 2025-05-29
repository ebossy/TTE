import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  SidenavToolbarLayoutComponent
} from '../../../../core/components/sidenav-toolbar-layout/sidenav-toolbar-layout.component';
import {Project} from '../../models/Project';
import {ProjectFirestoreService} from '../../services/project-firestore.service';
import {Observable, of} from 'rxjs';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {TaskFormComponent} from '../../components/task-form/task-form.component';
import {NgForOf} from '@angular/common';
import {TaskCardComponent} from '../../components/task-card/task-card.component';
import {Task} from '../../models/Task';
import {TaskFirestoreService} from '../../services/task-firestore.service';
import {InviteDialogComponent} from '../../../../core/invitation/components/invite-dialog/invite-dialog.component';
import {UserFirestoreService} from '../../../../core/services/user-firestore.service';

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

  filter: 'all' | 'my' | 'done' | 'open' | 'unassigned' = 'all';

  constructor(private route: ActivatedRoute,
              private projectFire: ProjectFirestoreService,
              private dialog: MatDialog,
              private taskFire: TaskFirestoreService,
              private userFire: UserFirestoreService,
              private router: Router,
              ) {}

  ngOnInit() {

    //Projekt daten aus der url beziehen
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

    //Projekt wird gelöscht, wenn er keine member mehr hat
    this.project.subscribe(project => {
      if(project.member.length == 0){
        this.projectFire.deleteDoc(project)
      }
    })

    this.tasks$ = this.taskFire.getProjectTasks(this.projId)

    this.tasks$.subscribe(tasks => {
      this.applyFilter(tasks);
    })
  }

  openTaskDialog() {
    console.log(this.projId)
    this.dialog.open(TaskFormComponent, {
      width: '40%',
      disableClose: true,
      data: {projectId: this.projId}
    });
  }

  async applyFilter(tasks: Task[]){
    const userId = await this.userFire.getCurrentUserID();
    switch (this.filter) {
      case 'my':
        this.filteredTasks = tasks.filter(t => t.assignedToId == userId);
        break
      case 'unassigned':
        this.filteredTasks = tasks.filter(t => t.assignedToId == "");
        break
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

  /**
   * funktion wird von buttons aus der html aufgerufen
   * @param value Filter wert
   */
  setFilter(value: 'all' | 'my' | 'done' | 'open' | 'unassigned') {
    this.filter = value;
    this.tasks$.subscribe(tasks => this.applyFilter(tasks)); // Filter neu anwenden
  }

  openInviteDialog(projectId: string): void {
    this.dialog.open(InviteDialogComponent, {
      data: {
        groupId: projectId,
        groupType: "projects"
      }
    });
  }

  leave() {
    const currentUser = this.userFire.getCurrentUserID()
    this.projectFire.removeMember(this.projId, currentUser)
    this.router.navigate(["/project"]);
  }
}
