import {inject, Injectable} from '@angular/core';
import {InvitationFireService} from './invitation-fire.service';
import {Invitation} from '../models/invitation';
import {FirestoreService} from '../../services/firestore.service';
import {firstValueFrom} from 'rxjs';
import {EventTTE} from '../../../features/event/models/EventTTE';
import {Project} from '../../../features/project/models/Project';

@Injectable({
  providedIn: 'root'
})
export class InvitationHandlingService {

  private firestore = inject(FirestoreService);

  constructor(
    private invitationFire: InvitationFireService,
  ) { }

  async createInvitation(groupId: string, groupType: string, userId: string, message: string) {

    // Fall 1 Member bereits in Gruppe
    const group:EventTTE|Project = await firstValueFrom(this.firestore.getDocument(groupType, groupId));
    if (group?.member?.includes(userId)) {
      alert("Nutzer bereits Mitglied")
      return;
    }

    // 2. Prüfen, ob Einladung schon existiert
    const existingInvitations = await firstValueFrom(
      this.firestore.getCollectionFilter<Invitation>(
        'invitations',
        'userId',
        '==',
        userId
      )
    );

    const alreadyInvited = existingInvitations.some(
      inv => inv.groupId === groupId && inv.groupType === groupType
    );

    if (alreadyInvited) {
      alert("Nutzer bereits Eingeladen")
      return;
    }

    const newInvitation= {
      groupId: groupId,
      groupType: groupType,
      userId: userId,
      message: message,
    }
    this.firestore.getDocument(groupType,groupId)
    this.invitationFire.addDoc(newInvitation);
  }

  respond(invitation: Invitation, status: 'accepted' | 'declined'){
    if (status === 'declined') {//Declined steht für den Button ❌ aus dem invitations Menü
      this.invitationFire.deleteDoc(invitation)
    }
    else if (status === 'accepted') {//Declined steht für den Button ✔️ aus dem invitations Menü
      this.firestore.addToField(invitation.groupType, invitation.groupId, invitation.userId, "member")
        .then(()=>{this.invitationFire.deleteDoc(invitation)})
    }
  }

}
