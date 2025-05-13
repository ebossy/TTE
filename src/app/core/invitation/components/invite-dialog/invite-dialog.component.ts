import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {UserFirestoreService} from '../../../services/user-firestore.service';
import {InvitationHandlingService} from '../../services/invitation-handling.service';

@Component({
  selector: 'app-invite-dialog',
  imports: [
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './invite-dialog.component.html',
  styleUrl: './invite-dialog.component.css'
})
export class InviteDialogComponent {
  usermail: string = '';
  constructor(
    public dialogRef: MatDialogRef<InviteDialogComponent>,
    private invitationHandler: InvitationHandlingService,
    private userFire: UserFirestoreService,
    @Inject(MAT_DIALOG_DATA) public data: { groupId: string; groupType: string }
  ) {}

  async inviteUser() {
    if (!this.usermail.trim()) return; //Falls leer
    const user = await this.userFire.getUserByEmail(this.usermail);
    if (!user){
      alert("Benutzer nicht gefunden");  // Fehlermeldung an den Benutzer anzeigen
      return;
    }
    this.invitationHandler.createInvitation(this.data.groupId, this.data.groupType, user.id);
    this.dialogRef.close();
  }
}
