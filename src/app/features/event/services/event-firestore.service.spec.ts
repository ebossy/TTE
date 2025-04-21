import { TestBed } from '@angular/core/testing';

import { EventFirestoreService } from './event-firestore.service';

describe('EventFirestoreService', () => {
  let service: EventFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
