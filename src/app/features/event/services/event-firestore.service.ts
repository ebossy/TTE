import {inject, Injectable} from '@angular/core';
import {FirestoreService} from '../../../core/services/firestore.service';
import {UserFirestoreService} from '../../../core/services/user-firestore.service';
import {EventTTE} from '../models/EventTTE';


@Injectable({
  providedIn: 'root'
})
export class EventFirestoreService {

  private firestore = inject(FirestoreService);


  constructor(
    private userFire: UserFirestoreService
  ) {
  }


  addDoc(eventTTE: any){
    this.firestore.addDocument("events", eventTTE)
  }


  async getUserEvents() {
    const userID = await this.userFire.getCurrentUserID();
    return this.firestore.getCollectionFilter<EventTTE>("events", "member", "array-contains", userID)
  }


  updateDoc(eventTTE :EventTTE){
    const{id, ...eventData} = eventTTE //id aus der Datenkapsel entfernen, da id sonst ein neues Feld bekommt
    this.firestore.updateDocument("events", eventTTE.id, eventData)
  }


  deleteDoc(eventTTE :EventTTE){
    this.firestore.deleteDocument("events",eventTTE.id)
  }
}
