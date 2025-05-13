import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import {from, Observable, of, switchMap} from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import {UserFirestoreService} from '../../../core/services/user-firestore.service';
import {ProjectFirestoreService} from '../services/project-firestore.service';
import {FireauthService} from '../../auth/services/fireauth.service';
import {User} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class ProjectAccessGuard implements CanActivate {

  constructor(
    private projectFire: ProjectFirestoreService,
    private fireauth: FireauthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const projectId = route.paramMap.get('id');

    if (!projectId) {
      return of(false);
    }


    return this.fireauth.getAuthState().pipe(
      switchMap((user: User | null) => {
        const currentUserId = user?.uid;

        if (!currentUserId) {
          console.error('User not logged in');
          this.router.navigate(['/dashboard']);
          return of(false);
        }

        return this.projectFire.getDocById(projectId).pipe(
          map(project => {
            if (!project) {
              console.error('Project not found');
              this.router.navigate(['/dashboard']);
              return false;
            }

            const allowedUserIds = project.member || [];

            if (allowedUserIds.includes(currentUserId)) {
              return true;
            }

            console.warn('User not authorized for this project');
            this.router.navigate(['/dashboard']);
            return false;
          }),
          catchError(err => {
            console.error('Error fetching project:', err);
            this.router.navigate(['/dashboard']);
            return of(false);
          })
        );
      }),
      catchError(err => {
        console.error('Error with auth state:', err);
        this.router.navigate(['/dashboard']);
        return of(false);
      })
    );
  }
}
