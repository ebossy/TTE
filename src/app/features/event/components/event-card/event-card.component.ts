import {Component, Input, OnInit} from '@angular/core';
import {EventTTE} from '../../models/EventTTE';
import {EventFirestoreService} from '../../services/event-firestore.service';
import {MatCard, MatCardFooter, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {UserFirestoreService} from '../../../../core/services/user-firestore.service';
import {NgIf} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {InviteDialogComponent} from '../../../../core/invitation/components/invite-dialog/invite-dialog.component';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-event-card',
  imports: [
    MatCard,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon,
    MatIconButton,
    MatCardFooter,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    NgIf,
  ],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent implements OnInit {
  @Input() eventTTE!: EventTTE;
  isOwner: boolean = false;
  dateString: string = "";
  dateDiff: any = "";
  constructor(
    private eventFire: EventFirestoreService,
    private userFire: UserFirestoreService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    const currentUserId = await this.userFire.getCurrentUserID();
    this.isOwner = this.eventTTE.creatorId === currentUserId;
    this.dateString = this.eventTTE.date.toDate().toLocaleString()
    this.dateString = this.dateString.substring(0, this.dateString.length-3)

    const eventTime = this.eventTTE.date.toMillis();
    const now = Timestamp.now().toMillis();

    let diffMs = eventTime - now;

    //umwandeln, was ausgegeben wird
    if (diffMs < 0) {
      this.dateDiff = "Bereits vorbei";
    } else {
      const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
      const hours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      this.dateDiff = `${days} Tage, ${hours} Stunden, ${minutes} Minuten übrig`;
    }
  }




  async leave() {
    const currentUserId = await this.userFire.getCurrentUserID();
    this.eventTTE.member = this.eventTTE.member.filter(member => member !== currentUserId);
    this.eventFire.updateDoc(this.eventTTE);
  }

  delete(){
    this.eventFire.deleteDoc(this.eventTTE);
  }



  openInviteDialog(event: EventTTE): void {
    this.dialog.open(InviteDialogComponent, {
      data: {
        groupId: event.id,
        groupType: "events"
      }
    });
  }
}
