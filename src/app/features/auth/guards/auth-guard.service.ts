import {inject, Injectable} from '@angular/core';
import {FireauthService} from '../services/fireauth.service';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { map, take, tap} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private authService =  inject(FireauthService)
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.authService.getAuthState().pipe(
      take(1), // Wir wollen nur den ersten Wert abwarten
      map(user => !!user), // Falls ein User vorhanden ist, wird true zurückgegeben
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          // Wenn der User nicht eingeloggt ist, weiterleiten zur Login-Seite
          this.router.navigate(['/login']);
        }
      })
    );
  }


}
