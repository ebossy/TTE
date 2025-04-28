import { Timestamp } from 'firebase/firestore';

export class EventTTE{
  id: string;
  title: string;
  date: Timestamp;
  creatorId: string;
  member: string[];

  constructor(data: Partial<EventTTE> = {}){
    this.id = data.id || "";
    this.title = data.title || "";
    this.date = data.date || Timestamp.now();
    this.creatorId = data.creatorId || "";
    this.member = data.member || [];
  }
}
