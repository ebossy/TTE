import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {UserFirestoreService} from '../../../../core/services/user-firestore.service';
import {TodoFirestoreService} from '../../services/todo-firestore.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-todo-form',
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatButton,
  ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  todoForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userFire: UserFirestoreService,
              private todoFire: TodoFirestoreService,
              private dialogRef: MatDialogRef<TodoFormComponent>)
  {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  async onSubmit() {
    if (this.todoForm.valid) {
      // Verwende async/await, um sicherzustellen, dass die userId korrekt gesetzt wird
      const userId = await this.userFire.getCurrentUserID();

      // todo attribute bündeln
      const formValue = this.todoForm.value;
      let newTodo = {
        title: formValue.title,
        description: formValue.description,
        status: false, // Status immer false bei Erstellung
        userId: userId,
      };

      this.todoFire.addDoc(newTodo);

      // Dialog schließen, nachdem das Todo hinzugefügt wurde
      this.closeForm()

    }
  }
  closeForm(){
    this.dialogRef.close();
  }
}
