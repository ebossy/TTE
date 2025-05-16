import {Component, inject, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {UserFB} from '../../../features/auth/models/UserFB';
import {NavigationEnd, Router} from '@angular/router';
import {FireauthService} from '../../../features/auth/services/fireauth.service';
import {UserFirestoreService} from '../../services/user-firestore.service';
import {InvitationMenuComponent} from '../../invitation/components/invitation-menu/invitation-menu.component';
import {filter} from 'rxjs';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-sidenav-toolbar-layout',
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatButton,
    MatMenu,
    MatMenuItem,
    MatSidenavContainer,
    MatSidenav,
    MatMenuTrigger,
    MatSidenavContent,
    InvitationMenuComponent,
  ],
  templateUrl: './sidenav-toolbar-layout.component.html',
  styleUrl: './sidenav-toolbar-layout.component.css'
})
export class SidenavToolbarLayoutComponent implements OnInit {
  private fireauth = inject(FireauthService);
  protected sidenavOpened:boolean = false;


  constructor(
    private router: Router,
    private userFire: UserFirestoreService,
  ) {}

  currentUser: UserFB = new UserFB();

  ngOnInit() {
    const savedState = localStorage.getItem('sidenavOpened');
    this.sidenavOpened = savedState === 'true';

    this.userFire.getCurrentUser().then(data => {
      if(data){
        this.currentUser = data;
      }

    });
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
    localStorage.setItem('sidenavOpened', String(this.sidenavOpened));
  }



  navigateTo(page:string){
    this.router.navigate([`/${page}`]);
  }
  signOut(){
    this.fireauth.signOut()
  }
}
