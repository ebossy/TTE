import {inject, Injectable} from '@angular/core';
import {InvitationFireService} from './invitation-fire.service';
import {Todo} from '../../../features/todo/models/Todo';
import {UserFirestoreService} from '../../services/user-firestore.service';
import {Invitation} from '../models/invitation';
import {FirestoreService} from '../../services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class InvitationHandlingService {

  private firestore = inject(FirestoreService);

  constructor(
    private invitationFire: InvitationFireService,
  ) { }

  createInvitation(groupId: string, groupType: string, userId: string) {
    const newInvitation= {
      groupId: groupId,
      groupType: groupType,
      userId: userId,
      status: "pending"
    }
    this.invitationFire.addDoc(newInvitation);
  }

  async acceptInvitation(invitation: Invitation) {
    // 1. Update invitation status
    this.invitationFire.deleteDoc(invitation)

    // 2. Füge den Benutzer dem Projekt hinzu
    await this.firestore.addToField(invitation.groupType, invitation.groupId, invitation.userId, "member")
  }

}
