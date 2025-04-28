import { Component } from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatDialogRef} from '@angular/material/dialog';
import {UserFirestoreService} from '../../../../core/services/user-firestore.service';
import {ProjectFirestoreService} from '../../services/project-firestore.service';

@Component({
  selector: 'app-project-form',
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFormField,
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {
  projectForm: FormGroup;

  constructor(
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<ProjectFormComponent>,
    private userFire: UserFirestoreService,
    private projectFire: ProjectFirestoreService,
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
    })
  }

  async onSubmit(){
    if(this.projectForm.valid){
      const userId = await this.userFire.getCurrentUserID();
      const formValue = this.projectForm.value;

      let newProject = {
        title: formValue.title,
        member: [userId],
      }

      this.projectFire.addDoc(newProject)

      this.closeForm()
    }
  }

  closeForm(){
    this.dialogRef.close();
  }
}
