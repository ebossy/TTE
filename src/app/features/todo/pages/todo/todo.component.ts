import { Component } from '@angular/core';
import {
  SidenavToolbarLayoutComponent
} from '../../../../core/components/sidenav-toolbar-layout/sidenav-toolbar-layout.component';

@Component({
  selector: 'app-todo',
  imports: [
    SidenavToolbarLayoutComponent
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

}
