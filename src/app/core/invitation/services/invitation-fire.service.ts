import {inject, Injectable} from '@angular/core';
import {FirestoreService} from '../../services/firestore.service';
import {UserFirestoreService} from '../../services/user-firestore.service';
import {Invitation} from '../models/invitation';

@Injectable({
  providedIn: 'root'
})
export class InvitationFireService {

  private firestore = inject(FirestoreService);

  constructor(
    private userFire: UserFirestoreService
  ) {}

  addDoc(invitations: any) {
    this.firestore.addDocument("invitations", invitations )
  }

  async getUserInvitations() {
    const userId = await this.userFire.getCurrentUserID();
    return this.firestore.getCollectionFilter<Invitation>("invitations","userId", "==",userId)
  }

  updateDoc(invitation :Invitation){
    const{id, ...invitationData} = invitation //id aus der Datenkapsel entfernen, da id sonst ein neues Feld bekommt
    this.firestore.updateDocument("invitations", invitation.id, invitationData)
  }


  deleteDoc(invitation:Invitation){
    this.firestore.deleteDocument("invitations",invitation.id)
  }
}
