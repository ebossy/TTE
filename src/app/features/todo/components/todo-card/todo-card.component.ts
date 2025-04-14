import {Component, Input} from '@angular/core';
import {MatCard, MatCardActions, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatCheckbox} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {Todo} from '../../models/Todo';

@Component({
  selector: 'app-todo-card',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatCheckbox,
    FormsModule
  ],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.css'
})
export class TodoCardComponent {
  @Input() todo!: Todo;

  checkboxChanged() {

  }
}
