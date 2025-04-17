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
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})

/**
 * Page zeigt todos an
 */
export class TodoComponent implements OnInit{
  todos$: Observable<Todo[]> = of([]);

  //Array welches angezeit wird
  filteredTodos: Todo[] = [];

  filter: 'all' | 'done' | 'open' = 'all';


  async ngOnInit() {
    this.todos$ = await this.todoFire.getUserTodos()

    //Bei jeder änderung Filter aufrufen
    this.todos$.subscribe(todos => {
      this.applyFilter(todos);
    });
  }


  test() {
    console.log(this.todoFire.getUserTodos());
  }

  constructor(
    private dialog: MatDialog,
    private todoFire: TodoFirestoreService) {}


  openTodoDialog() {
    this.dialog.open(TodoFormComponent, {
      width: '40%',
      disableClose: true
    });
  }

  //Filtert aus dem Observable was angezeigt werden soll
  applyFilter(todos: Todo[]) {
    switch (this.filter) {
      case 'done':
        this.filteredTodos = todos.filter(t => t.status);
        break;
      case 'open':
        this.filteredTodos = todos.filter(t => !t.status);
        break;
      case 'all':
      default:
        this.filteredTodos = todos;
    }
  }

  /**
   * funktion wird von buttons aus der html aufgerufen
   * @param value Filter wert
   */
  setFilter(value: 'all' | 'done' | 'open') {
    this.filter = value;
    this.todos$.subscribe(todos => this.applyFilter(todos)); // Filter neu anwenden
  }
}
