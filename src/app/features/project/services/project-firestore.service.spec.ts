import { TestBed } from '@angular/core/testing';

import { ProjectFirestoreService } from './project-firestore.service';

describe('ProjectFirestoreService', () => {
  let service: ProjectFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
