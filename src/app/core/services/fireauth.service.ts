import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  getAuth, authState
} from '@angular/fire/auth';
import {Observable, from, take} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {
  constructor(private auth: Auth,
              private router: Router,) {}

  /**
   * Registriert einen neuen Benutzer mit E-Mail und Passwort.
   *
   * @returns Observable mit dem erstellten Benutzer (`UserCredential`), falls erfolgreich.
   */
  signUp(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  /**
   * Meldet einen Benutzer mit E-Mail und Passwort an.
   *
   * @returns Observable mit den Benutzerinformationen (`UserCredential`), falls erfolgreich.
   */
  signIn(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  /**
   * Meldet den aktuellen Benutzer ab.
   *
   * @returns Observable mit `void`, wenn das Abmelden erfolgreich war.
   */
  signOut(): Observable<void> {
    this.router.navigate(['/']);
    return from(signOut(this.auth).then(() => window.location.reload()));

    // Gibt ein Observable mit `void` zurück (kein Wert, nur Erfolg oder Fehler)
  }

  /**
   * Beobachtet den aktuellen Auth-Status des Benutzers.
   *
   * @returns Observable mit `User | null`:
   * - `User`-Objekt, falls der Benutzer eingeloggt ist.
   * - `null`, falls kein Benutzer angemeldet ist.
   */
  getAuthState(): Observable<User | null> {
    return authState(this.auth).pipe(take(1)); // nimmt nur den ersten Wert und schließt ab
  }
}
