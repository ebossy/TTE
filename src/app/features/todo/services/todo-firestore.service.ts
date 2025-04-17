import {inject, Injectable} from '@angular/core';
import {FireauthService} from '../../auth/services/fireauth.service';
import {FirestoreService} from '../../../core/services/firestore.service';
import {Todo} from '../models/Todo';
import {UserFirestoreService} from '../../../core/services/user-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class TodoFirestoreService {

  private firestore = inject(FirestoreService);
  constructor(
    private userFire: UserFirestoreService
  ) {
  }
  addDoc(todo: any){
    this.firestore.addDocument("todos", todo)
  }

  async getUserTodos() {
    const userID = await this.userFire.getCurrentUserID();
    return this.firestore.getCollectionEqualsFilter<Todo>("todos","userId",userID)//todo nochmal checken
  }

  updateDoc(todo :Todo){
    const{id, ...todoData} = todo //id aus der Datenkapsel entfernen, da id sonst ein neues Feld bekommt
    this.firestore.updateDocument("todos", todo.id, todoData)
  }
  deleteDoc(todo:Todo){
    this.firestore.deleteDocument("todos",todo.id)
  }
}
