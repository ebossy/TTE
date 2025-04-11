import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {FireauthService} from '../../core/services/fireauth.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatToolbar,
    MatIcon,
    MatSidenavContainer,
    MatSidenavContent,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatCheckbox,
    MatCardContent,
    MatIconButton,
    MatSidenav,
    MatMenu,
    MatMenuItem,
    MatButton,
    MatMenuTrigger
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private fireauth: FireauthService
    ) {}

  test(){
    console.log('test');
  }

  navigateTo(page:string){
    this.router.navigate([`/${page}`]);
  }
  signOut(){
    this.fireauth.signOut()
  }
}
