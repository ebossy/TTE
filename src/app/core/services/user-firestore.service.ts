import {inject, Injectable} from '@angular/core';
import {FirestoreService} from './firestore.service';
import {User} from '@angular/fire/auth';
import {firstValueFrom, Observable, take} from 'rxjs';
import {doc, getDoc, setDoc} from '@angular/fire/firestore';
import {FireauthService} from '../../features/auth/services/fireauth.service';

@Injectable({
  providedIn: 'root'
})
export class UserFirestoreService {
  private fireauth = inject(FireauthService);
  private firestore = inject(FirestoreService);


  /**
   * Speichert Benutzerdaten in der Firestore-Datenbank unter der Sammlung 'users'
   */
  saveUserData(user: User, data:any){
    this.firestore.addDocumentWithId("users", user.uid, data)
  }

  async getCurrentUser(): Promise<any> {
    const user = await firstValueFrom(this.fireauth.getAuthState().pipe(take(1)));
    if (user) {
      const docRef = this.firestore.getDocRef('users', user.uid);
      const userSnap = await getDoc(docRef);
      const userId = userSnap.id
      const userData = userSnap.data();  // Hole die Benutzerdaten
      if (userData && typeof userData === 'object') {
        return {id: userId, ...userData};
      }
    }
    return null;
  }
}
