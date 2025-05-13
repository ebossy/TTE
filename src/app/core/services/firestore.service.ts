import { Injectable } from '@angular/core';
import { setLogLevel, LogLevel } from "@angular/fire";
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc, query, where, WhereFilterOp, getCountFromServer,
  arrayUnion,
  arrayRemove
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  constructor(
    private firestore: Firestore,
    ) {
    setLogLevel(LogLevel.SILENT); //verhindert Unnötiges anzeigen von Warnungen
  }



  /**
   * Holt alle Dokumente aus einer bestimmten Sammlung
   */
  getCollection<T>(collectionName: string): Observable<T[]> {
    const colRef = collection(this.firestore, collectionName);
    return collectionData(colRef, { idField: 'id' }) as Observable<T[]>;
  }

  /**
   * Holt alle Dokumente welche den Filter Kriterie nentsprechen
   *
   */
  getCollectionFilter<T>(collectionName: string, colletionField: string, filterType:WhereFilterOp, filterData:string): Observable<T[]> {
    const colRef = collection(this.firestore, collectionName);
    const q = query(colRef, where(colletionField, filterType, filterData));
    return collectionData(q, { idField: 'id' }) as Observable<T[]>;
  }

  /**
   * Holt ein einzelnes Dokument aus Firestore
   */
  getDocument<T>(collectionName: string, id: string): Observable<T> {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<T>;
  }


  /**
   * Holt eine Referenz aus Firestore
   */
  getDocRef(collectionName: string, id: string): any{
    return doc(this.firestore, `${collectionName}/${id}`);
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
   * Aktualisiert ein Array von einem Dokument(Hinzufügen)
   */
  async addToField(collectionName: string, id: string, data: any, fieldName: string) {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return await updateDoc(docRef, { [fieldName]: arrayUnion(data) });
  }

  /**
   * Aktualisiert ein Array von einem Dokument(Löschen)
   */
  async removeFromField(collectionName: string, id: string, data: any, fieldName: string) {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return await updateDoc(docRef, { [fieldName]: arrayRemove(data) });
  }

  /**
   * Löscht ein Dokument aus der Sammlung
   */
  async deleteDocument(collectionName: string, id: string) {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return await deleteDoc(docRef);
  }


  /**
   * Zählt wie viele gültige/gesuchte werte existieren
   */
  async countItemsWithId(collectionName:string, collectionField: string, searchedId: string): Promise<number> {
    const xCollection = collection(this.firestore, collectionName);
    const q = query(xCollection, where(collectionField, '==', searchedId));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  }
}
