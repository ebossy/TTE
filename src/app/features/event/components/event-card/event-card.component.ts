import {Component, Input, OnInit} from '@angular/core';
import {EventTTE} from '../../models/EventTTE';
import {EventFirestoreService} from '../../services/event-firestore.service';
import {MatCard, MatCardActions, MatCardFooter, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {UserFirestoreService} from '../../../../core/services/user-firestore.service';
import {NgIf} from '@angular/common';

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
    NgIf
  ],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent implements OnInit {
  @Input() eventTTE!: EventTTE;
  isOwner: boolean = false;
  constructor(
    private eventFire: EventFirestoreService,
    private userFire: UserFirestoreService,
  ) {}

  async ngOnInit() {
    const currentUserId = await this.userFire.getCurrentUserID();
    this.isOwner = this.eventTTE.creatorId === currentUserId;
  }

  test(){
    console.log("test")
  }


  async leave() {
    const currentUserId = await this.userFire.getCurrentUserID();
    this.eventTTE.member = this.eventTTE.member.filter(member => member !== currentUserId);
    this.eventFire.updateDoc(this.eventTTE);
  }

  delete(){
    this.eventFire.deleteDoc(this.eventTTE);
  }
}
