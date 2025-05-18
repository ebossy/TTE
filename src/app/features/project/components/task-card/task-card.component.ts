import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../models/Task';
import {TaskFirestoreService} from '../../services/task-firestore.service';
import {MatCard, MatCardActions, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {NgClass, NgIf} from '@angular/common';
import {UserFirestoreService} from '../../../../core/services/user-firestore.service';
import {UserFB} from '../../../auth/models/UserFB';

@Component({
  selector: 'app-task-card',
  imports: [
    MatCard,
    MatIconButton,
    MatIcon,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatCheckbox,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    NgIf,
    MatButton,
    NgClass
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;

  assignedUser: UserFB = new UserFB();
  isAssigned: boolean = false;
  imAssigned:boolean = false;
  constructor(
    private taskFire: TaskFirestoreService,
    private userFire:UserFirestoreService,
  ) {
  }

  ngOnInit() {
    this.isAssigned = !(""== this.task.assignedToId)
    this.imAssigned = (this.userFire.getCurrentUserID() == this.task.assignedToId)
    if (this.task.assignedToId != "") {
      this.userFire.getUserById(this.task.assignedToId).subscribe(user => {
        this.assignedUser = user;
      });
    }
  }

  checkboxChanged(){
    this.task.status = !this.task.status;
    this.taskFire.updateDoc(this.task)
  }

  delete(){
    this.taskFire.deleteDoc(this.task)
  }

  claimTask(){
    this.task.assignedToId = this.userFire.getCurrentUserID();
    this.taskFire.updateDoc(this.task)
  }

  unclaimTask(){
    this.task.assignedToId = "";
    this.taskFire.updateDoc(this.task)
  }
}
