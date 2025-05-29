import { Routes } from '@angular/router';
import {LoginComponent} from './features/auth/pages/login/login.component';
import {RegisterComponent} from './features/auth/pages/register/register.component';
import {DashboardComponent} from './core/pages/dashboard/dashboard.component';
import {TodoComponent} from './features/todo/pages/todo/todo.component';
import {EventComponent} from './features/event/pages/event/event.component';
import {ProjectComponent} from './features/project/pages/project/project.component';
import {AuthGuardService} from './features/auth/guards/auth-guard.service';
import {ProjectDetailComponent} from './features/project/pages/project-detail/project-detail.component';
import {ProjectAccessGuard} from './features/project/guards/project-access.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },



  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: "todo", component: TodoComponent, canActivate: [AuthGuardService]},
  {path: "event", component: EventComponent, canActivate: [AuthGuardService]},
  {path: "project", component: ProjectComponent, canActivate: [AuthGuardService],},
  {path:"project/:id", component: ProjectDetailComponent, canActivate: [ProjectAccessGuard]},

  {path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',},
];
