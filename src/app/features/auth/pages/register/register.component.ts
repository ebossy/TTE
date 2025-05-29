import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {FireauthService} from '../../services/fireauth.service';
import {UserFirestoreService} from '../../../../core/services/user-firestore.service';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFormField,

  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private fireauth = inject(FireauthService);

  constructor(
    private userFire: UserFirestoreService,
    private router:Router
) {}
  public email:any;
  public password:any;
  public name:any

  navigateTo(page:string){
    this.router.navigate([`/${page}`]);
  }

  /**
   * speichert einen Eintrag in der Users collection bei erfolgreicher Registrierung
   */
  async onRegister() {
    console.log('Login attempt:', this.email, this.password, this.name);

    this.fireauth.signUp(this.email, this.password).subscribe({
      next: (cred) => {
        console.log('Registrierung erfolgreich:', cred);
        this.userFire.saveUserData(cred.user, {email: this.email, name: this.name});
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        console.error('Registrierung fehlgeschlagen:', err.message);
        alert('Fehler: ' + err.message); // Zeigt eine Fehlermeldung an den Benutzer
      }
    });
  }
}
