import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: Firestore,
    ) { }

  /**
   * Holt alle Dokumente aus einer bestimmten Sammlung
   */
  getCollection<T>(collectionName: string): Observable<T[]> {
    const colRef = collection(this.firestore, collectionName);
    return collectionData(colRef, { idField: 'id' }) as Observable<T[]>;
  }

  /**
   * Holt ein einzelnes Dokument aus Firestore
   */
  getDocument<T>(collectionName: string, id: string): Observable<T> {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<T>;
  }



  /**
   * Fügt ein neues Dokument zur Sammlung hinzu
   */
  async addDocument<T>(collectionName: string, data: any) {
    const colRef = collection(this.firestore, collectionName);
    return await addDoc(colRef, data);
  }

  /**
   * Fügt ein neues Dokument zur Sammlung hinzu mit id
   */
  async addDocumentWithId<T>(collectionName: string, documentId: string, data: any) {
    const docRef = doc(this.firestore, `${collectionName}/${documentId}`);
    await setDoc(docRef, data);
    return docRef; // optional: gibt das referenzierte Dokument zurück
  }

  /**
   * Aktualisiert ein bestehendes Dokument
   */
  async updateDocument<T>(collectionName: string, id: string, data: Partial<T>) {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return await updateDoc(docRef, data);
  }

  /**
   * Löscht ein Dokument aus der Sammlung
   */
  async deleteDocument(collectionName: string, id: string) {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return await deleteDoc(docRef);
  }
}
