import {inject, Injectable} from '@angular/core';
import {Task} from '../models/Task';
import {Observable} from 'rxjs';
import {FirestoreService} from '../../../core/services/firestore.service';
import {UserFirestoreService} from '../../../core/services/user-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class TaskFirestoreService {

  private firestore = inject(FirestoreService);


  constructor(
    private userFire: UserFirestoreService
  ) {}

  updateDoc(task: Task){
    const{id, ...taskData} = task; //id aus der Datenkapsel entfernen, da id sonst ein neues Feld bekommt
    this.firestore.updateDocument("tasks", task.id, taskData);
  }

  deleteDoc(task: Task){
    this.firestore.deleteDocument("tasks", task.id);
  }
  getDocById(id:string):Observable<Task> {
    return this.firestore.getDocument<Task>("tasks", id);
  }

  getProjectTasks(projId:string){
    return this.firestore.getCollectionFilter<Task>("tasks", "projectId", "==", projId)
  }

  addDoc(task: any){
    this.firestore.addDocument("tasks", task);
  }

  countTasksForProject(projectId:string){
    return this.firestore.countItemsWithId("tasks", "projectId", projectId);
  }
}
