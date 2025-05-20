import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Invitation} from '../../models/invitation';
import {InvitationFireService} from '../../services/invitation-fire.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {InvitationHandlingService} from '../../services/invitation-handling.service';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';


@Component({
  selector: 'app-invitation-menu',
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    MatButton,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuTrigger,

  ],
  templateUrl: './invitation-menu.component.html',
  styleUrl: './invitation-menu.component.css'
})
export class InvitationMenuComponent implements OnInit{



  invitations$: Observable<Invitation[]> = of([]);

  constructor(
    private invitationFire: InvitationFireService,
    private invitationHandler: InvitationHandlingService
  ) {}

  async ngOnInit() {
    this.invitations$ = await this.invitationFire.getUserInvitations();
  }

  respond(invitation: Invitation, status: 'accepted' | 'declined') {
    this.invitationHandler.respond(invitation, status)
  }

}
