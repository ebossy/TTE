import {inject, Injectable} from '@angular/core';
import {FirestoreService} from './firestore.service';
import {getDoc} from '@angular/fire/firestore';
import {FireauthService} from '../../features/auth/services/fireauth.service';
import {UserFB} from '../../features/auth/models/UserFB';
import {firstValueFrom, take} from 'rxjs';
import {User} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class UserFirestoreService {
  private fireauth = inject(FireauthService);
  private firestore = inject(FirestoreService);



  saveUserData(user: User, data:any){
    this.firestore.addDocumentWithId("users", user.uid, data)
  }

  /**
   * nimmt den User aus der User collection nicht aus auth
   */
  async getCurrentUser() {
    const user = this.fireauth.getCurrentUser()
    if (user) {
      const docRef = this.firestore.getDocRef('users', user.uid);
      const userSnap = await getDoc(docRef);
      const userId = userSnap.id
      const userData = userSnap.data();  // Hole die Benutzerdaten
      if (userData && typeof userData === 'object') {
        return {id: userId, ...userData} as UserFB;
      }
    }
    return null;
  }

  /**
   * nimmt nur die id mittels auth
   */
  getCurrentUserID(): any {
    return this.fireauth.getCurrentUser()?.uid
  }

  getUserById(userId: any) {
    return this.firestore.getDocument<UserFB>("users", userId);
  }

  async getUserByEmail(email: string): Promise<UserFB | undefined> {
    const users = await firstValueFrom(
      this.firestore.getCollectionFilter<UserFB>('users', 'email', '==', email).pipe(
        take(1) // nur den ersten Emit nehmen
      )
    );
    return users[0]; // gibt undefined zurück, wenn kein Benutzer gefunden
  }
}
