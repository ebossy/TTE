import { TestBed } from '@angular/core/testing';

import { TaskFirestoreService } from './task-firestore.service';

describe('TaskFirestoreService', () => {
  let service: TaskFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
