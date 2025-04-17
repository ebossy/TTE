import {Component, OnInit} from '@angular/core';
import {
  SidenavToolbarLayoutComponent
} from '../../../../core/components/sidenav-toolbar-layout/sidenav-toolbar-layout.component';
import {TodoCardComponent} from '../../components/todo-card/todo-card.component';
import {AsyncPipe, NgForOf} from '@angular/common';
import {Todo} from '../../models/Todo';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {TodoFormComponent} from '../../components/todo-form/todo-form.component';
import {TodoFirestoreService} from '../../services/todo-firestore.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-todo',
  imports: [
    SidenavToolbarLayoutComponent,
    TodoCardComponent,
    NgForOf,
    MatButton,
    MatIcon,
    AsyncPipe
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit{
  todos$: Observable<Todo[]> = of([]);
  async ngOnInit() {
    this.todos$ = await this.todoFire.getUserTodos()
  }


  test() {
    console.log(this.todoFire.getUserTodos());
  }
  constructor(
    private dialog: MatDialog,
    private todoFire: TodoFirestoreService) {}

  openTodoDialog() {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '40%',
      disableClose: true
    });
  }

}
