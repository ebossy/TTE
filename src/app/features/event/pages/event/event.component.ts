import {Component, OnInit} from '@angular/core';
import {
  SidenavToolbarLayoutComponent
} from '../../../../core/components/sidenav-toolbar-layout/sidenav-toolbar-layout.component';
import {NgForOf} from '@angular/common';
import {Observable, of} from 'rxjs';
import {EventTTE} from '../../models/EventTTE';
import {EventFirestoreService} from '../../services/event-firestore.service';
import {UserFirestoreService} from '../../../../core/services/user-firestore.service';
import {EventCardComponent} from '../../components/event-card/event-card.component';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {EventFormComponent} from '../../components/event-form/event-form.component';


@Component({
  selector: 'app-event',
  imports: [
    SidenavToolbarLayoutComponent,
    NgForOf,
    EventCardComponent,
    MatButton,
    MatIcon,
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit {

  constructor(private eventFire: EventFirestoreService,
              private userFire: UserFirestoreService,
              private dialog: MatDialog,) {
  }

  eventTTE$: Observable<EventTTE[]> = of([]);

  //Array welches angezeit wird
  filteredEventTTE: EventTTE[] = [];

  filter: 'all' | 'my' | 'other' = 'all';


  async ngOnInit() {
    this.eventTTE$ = await this.eventFire.getUserEvents()

    //Bei jeder änderung Filter aufrufen
    this.eventTTE$.subscribe(eventTTE => {
      this.applyFilter(eventTTE);
    });
  }

  openEventDialog() {
    this.dialog.open(EventFormComponent, {
      width: '40%',
      disableClose: true
    });

  }
  //Filtert aus dem Observable was angezeigt werden soll
  async applyFilter(todos: EventTTE[]) {
    const userId = await this.userFire.getCurrentUserID()
    switch (this.filter) {
      case 'my':
        this.filteredEventTTE = todos.filter(t => t.creatorId == userId);
        break;
      case 'other':
        this.filteredEventTTE = todos.filter(t => t.creatorId != userId);
        break;
      case 'all':
      default:
        this.filteredEventTTE = todos;
    }
  }

  /**
   * funktion wird von buttons aus der html aufgerufen
   * @param value Filter wert
   */
  setFilter(value: 'all' | 'my' | 'other') {
    this.filter = value;
    this.eventTTE$.subscribe(eventTTE => this.applyFilter(eventTTE)); // Filter neu anwenden
  }

}
