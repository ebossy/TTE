import {Component, Input} from '@angular/core';
import {MatCard, MatCardActions, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatCheckbox} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {Todo} from '../../models/Todo';
import {TodoFirestoreService} from '../../services/todo-firestore.service';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-todo-card',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatCheckbox,
    FormsModule,
    MatIcon,
    MatIconButton,
    NgClass
  ],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.css'
})
export class TodoCardComponent {
  @Input() todo!: Todo;
  constructor(
    private todoFire: TodoFirestoreService,
  ) {
  }
  checkboxChanged() {
    this.todo.status = !this.todo.status
    console.log(this.todo.status)
    this.todoFire.updateDoc(this.todo)
  }
  delete(){
    this.todoFire.deleteDoc(this.todo)
  }
}
