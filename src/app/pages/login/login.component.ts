import { Component } from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {FireauthService} from '../../core/services/fireauth.service';

@Component({
  selector: 'app-login',
  imports: [
    MatLabel,
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private router: Router,
    private fireauth: FireauthService,
  ) {}
  public email:any;
  public password:any;

  //TODO
  onLogin() {
    console.log('Login attempt:', this.email, this.password);

    // Hier verwenden wir subscribe, um die asynchrone Antwort zu behandeln
    this.fireauth.signIn(this.email, this.password).subscribe({
      next: (cred) => {
        console.log('Login erfolgreich:', cred);
        this.router.navigate(['dashboard']);  // Nach erfolgreichem Login weiter zum Dashboard
      },
      error: (err) => {
        console.error('Login fehlgeschlagen:', err.message);
        alert('Fehler: ' + err.message);  // Fehlermeldung an den Benutzer anzeigen
      }
    });
  }

  //TODO
  onForgotPassword() {
    console.log('Password recovery initiated');

  }

  test(){
    console.log('works!');
  }

  navigateTo(page:string){
    this.router.navigate([`/${page}`]);
  }
}
