import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import {from, Observable, of, switchMap} from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import {UserFirestoreService} from '../../../core/services/user-firestore.service';
import {ProjectFirestoreService} from '../services/project-firestore.service';

@Injectable({
  providedIn: 'root'
})

export class ProjectAccessGuard implements CanActivate {

  constructor(
    private projectFire: ProjectFirestoreService,
    private userFire: UserFirestoreService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const projectId = route.paramMap.get('id');

    if (!projectId) {
      return of(false);
    }

    return from(this.userFire.getCurrentUserID()).pipe(
      switchMap(currentUserId => { //Benutzer id

        return this.projectFire.getDocById(projectId).pipe(
          map(project => { //Project
            //Falls Project nicht existiert
            if (!project) {
              this.router.navigate(['/dashboard']);
              return false;
            }
            //Falls die Id kein String ist benötigt für includes
            if(typeof (currentUserId)!= "string"){
              this.router.navigate(['/dashboard']);
              return false;
            }

            const allowedUserIds = project.member || [];
            //Benutzer ist Berechtigt
            if (allowedUserIds.includes(currentUserId)) {
              return true;
            }

            //else fall falls nichts zutrifft
            this.router.navigate(['/dashboard']);
            return false;
          }),
          catchError(() => {
            this.router.navigate(['/dashboard']);
            return of(false);
          })
        );
      }),
      catchError(() => {
        this.router.navigate(['/dashboard']);
        return of(false);
      })
    );
  }
}

