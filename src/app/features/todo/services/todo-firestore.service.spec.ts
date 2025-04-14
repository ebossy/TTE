import { TestBed } from '@angular/core/testing';

import { TodoFirestoreService } from './todo-firestore.service';

describe('TodoFirestoreService', () => {
  let service: TodoFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
