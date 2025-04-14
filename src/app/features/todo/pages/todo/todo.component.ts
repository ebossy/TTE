import { Component } from '@angular/core';
import {
  SidenavToolbarLayoutComponent
} from '../../../../core/components/sidenav-toolbar-layout/sidenav-toolbar-layout.component';
import {TodoCardComponent} from '../../components/todo-card/todo-card.component';
import {NgForOf} from '@angular/common';
import {Todo} from '../../models/Todo';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-todo',
  imports: [
    SidenavToolbarLayoutComponent,
    TodoCardComponent,
    NgForOf,
    MatButton,
    MatIcon
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  public todos: Todo[] = [
    {
      title: "essen",
      description: "italiano",
      status: false,
      id: '',
      userId: ''
    },
    {
      title: "sport",
      description: "gym",
      status: false,
      id: '',
      userId: ''
    }
  ]


}
