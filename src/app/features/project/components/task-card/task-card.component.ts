import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../models/Task';
import {TaskFirestoreService} from '../../services/task-firestore.service';
import {MatCard, MatCardActions, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {NgIf} from '@angular/common';
import {UserFirestoreService} from '../../../../core/services/user-firestore.service';

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
    MatButton
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;

  isAssigned: boolean = false;

  constructor(
    private taskFire: TaskFirestoreService,
    private userFire:UserFirestoreService,
  ) {}

  ngOnInit() {
    this.isAssigned = !(""== this.task.assignedToId)
  }

  checkboxChanged(){
    this.task.status = !this.task.status;
    this.taskFire.updateDoc(this.task)
  }

  delete(){
    this.taskFire.deleteDoc(this.task)
  }

  async claimTask(){
    this.task.assignedToId = await this.userFire.getCurrentUserID();
    this.taskFire.updateDoc(this.task)
  }

  unclaimTask(){
    this.task.assignedToId = "";
    this.taskFire.updateDoc(this.task)
  }
}
