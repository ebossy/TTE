import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserFirestoreService} from '../../../../core/services/user-firestore.service';
import {EventFirestoreService} from '../../services/event-firestore.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';


@Component({
  selector: 'app-event-form',
  imports: [
    MatButton,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFormField,
  ],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userFire: UserFirestoreService,
              private eventFire: EventFirestoreService,
              private dialogRef: MatDialogRef<EventFormComponent>
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
    })
  }

  async onSubmit() {
    if (this.eventForm.valid) {
      const userId = await this.userFire.getCurrentUserID();
      const formValue = this.eventForm.value;

      const dateObject = new Date(formValue.date);
      let newEventTTE = {
        title: formValue.title,
        date: dateObject,
        member: [userId],
        creatorId: userId,
      }

      this.eventFire.addDoc(newEventTTE)

      this.closeForm()

    }
  }

  closeForm(){
    this.dialogRef.close();
  }
}
