import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {TodoComponent} from './pages/todo/todo.component';
import {EventComponent} from './pages/event/event.component';
import {ProjectComponent} from './pages/project/project.component';
import {AuthGuardService} from './core/guards/auth-guard.service';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: "todo", component: TodoComponent, canActivate: [AuthGuardService]},
  {path: "event", component: EventComponent, canActivate: [AuthGuardService]},
  {path: "project", component: ProjectComponent, canActivate: [AuthGuardService]},
];
