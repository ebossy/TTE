import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {TodoComponent} from './pages/todo/todo.component';
import {EventComponent} from './pages/event/event.component';
import {ProjectComponent} from './pages/project/project.component';

export const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "todo", component: TodoComponent},
  {path: "event", component: EventComponent},
  {path: "project", component: ProjectComponent},
];
