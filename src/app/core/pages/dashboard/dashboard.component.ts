import {Component} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatCheckbox} from '@angular/material/checkbox';
import {Router} from '@angular/router';

import {SidenavToolbarLayoutComponent} from '../../components/sidenav-toolbar-layout/sidenav-toolbar-layout.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatCheckbox,
    MatCardContent,
    SidenavToolbarLayoutComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{

  constructor(
    private router: Router,
    ) {}


  navigateTo(page:string){
    this.router.navigate([`/${page}`]);
  }

}
