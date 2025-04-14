import { Routes } from '@angular/router';
import {LoginComponent} from './features/auth/pages/login/login.component';
import {RegisterComponent} from './features/auth/pages/register/register.component';
import {DashboardComponent} from './core/pages/dashboard/dashboard.component';
import {TodoComponent} from './features/todo/pages/todo/todo.component';
import {EventComponent} from './pages/event/event.component';
import {ProjectComponent} from './pages/project/project.component';
import {AuthGuardService} from './features/auth/guards/auth-guard.service';


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
  {path: "project", component: ProjectComponent, canActivate: [AuthGuardService]},
];
