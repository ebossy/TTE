import {inject, Injectable} from '@angular/core';
import {FirestoreService} from '../../../core/services/firestore.service';
import {UserFirestoreService} from '../../../core/services/user-firestore.service';
import {Project} from '../models/Project';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectFirestoreService {
  private firestore = inject(FirestoreService);


  constructor(
    private userFire: UserFirestoreService
  ) {
  }

  addDoc(project: any){
    this.firestore.addDocument("projects", project);
  }

  async getUserProjects(){
    const userId = await this.userFire.getCurrentUserID();
    return this.firestore.getCollectionFilter<Project>("projects", "member", "array-contains", userId)
  }

  updateDoc(project: Project){
    const{id, ...projectData} = project; //id aus der Datenkapsel entfernen, da id sonst ein neues Feld bekommt
    this.firestore.updateDocument("projects", project.id, projectData);
  }

  deleteDoc(project: Project){
    this.firestore.deleteDocument("projects", project.id);
  }
  getDocById(id:string):Observable<Project> {
    return this.firestore.getDocument<Project>("projects", id);
  }
  removeMember(id:string, userId: string){
    this.firestore.removeFromField("projects", id, userId, "member")
  }
}
