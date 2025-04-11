import { Injectable } from '@angular/core';
import {FirestoreService} from './firestore.service';
import {User} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {setDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserFirestoreService {
  constructor(private firestore: FirestoreService) {}

  /**
   * Speichert Benutzerdaten in der Firestore-Datenbank unter der Sammlung 'users'
   */
  saveUserData(user: User, data:any){
    this.firestore.addDocumentWithId("users", user.uid, data)
  }
}
