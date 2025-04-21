import { Timestamp } from 'firebase/firestore';
import {UserFB} from '../../auth/models/UserFB';

export class EventTTE{
  id: string;
  title: string;
  date: Timestamp;
  creatorId: string;
  member: UserFB[];

  constructor(data: Partial<EventTTE> = {}){
    this.id = data.id || "";
    this.title = data.title || "";
    this.date = data.date || Timestamp.now();
    this.creatorId = data.creatorId || "";
    this.member = data.member || [];
  }
}
