import {Component, inject} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {FireauthService} from '../../services/fireauth.service';
import {take} from 'rxjs';

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
  private fireauth = inject(FireauthService);

  constructor(
    private router: Router,
  ) {}
  public email:any;
  public password:any;


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



  navigateTo(page:string){
    this.router.navigate([`/${page}`]);
  }

  /**
   * methode prüft, ob eingegebene E-Mail gültig ist
   */
  async forgetPassword(){
    const mail = this.email
    //wenn keine email eingegeben
    if(!mail){
      alert("Email angeben")
      return
    }
    //E-Mail zurücksetzung einleiten
    try{
      await this.fireauth.retrievePassword(mail)
      alert("Email überprüfen")
    }
      //unerwartete Fehler
    catch(error:any){
      alert(error.message)
    }
  }
}
