import {Component, inject, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {UserFB} from '../../../features/auth/models/UserFB';
import {Router} from '@angular/router';
import {FireauthService} from '../../../features/auth/services/fireauth.service';
import {UserFirestoreService} from '../../services/user-firestore.service';

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
    MatSidenavContent
  ],
  templateUrl: './sidenav-toolbar-layout.component.html',
  styleUrl: './sidenav-toolbar-layout.component.css'
})
export class SidenavToolbarLayoutComponent implements OnInit {
  // AuthService und UserFirestoreService per inject() einfügen
  private fireauth = inject(FireauthService);

  constructor(
    private router: Router,
    private userFire: UserFirestoreService,
  ) {}

  currentUser: UserFB = new UserFB();

  ngOnInit() {
    this.userFire.getCurrentUser().then(data => {
      this.currentUser = data;
    });
  }

  test(){
    console.log();
  }

  navigateTo(page:string){
    this.router.navigate([`/${page}`]);
  }
  signOut(){
    this.fireauth.signOut()
  }
}
