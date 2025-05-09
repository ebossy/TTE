import {Component, Inject, OnInit} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute} from '@angular/router';
import {TaskFirestoreService} from '../../services/task-firestore.service';

@Component({
  selector: 'app-task-form',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent{
  taskForm: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<TaskFormComponent>,
              private taskFire: TaskFirestoreService,
              @Inject(MAT_DIALOG_DATA) public data: { projectId: string }
              ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
    })
  }


  onSubmit() {
    if (this.taskForm.valid) {

      const formValue = this.taskForm.value;
      let newTask = {
        title: formValue.title,
        description: formValue.description,
        status: false,
        assignedToId: "",
        projectId: this.data.projectId,
      }
      this.taskFire.addDoc(newTask)
      this.closeForm()
    }


  }

  closeForm(){
    this.dialogRef.close();
  }
}
