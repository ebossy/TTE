import { TestBed } from '@angular/core/testing';

import { InvitationHandlingService } from './invitation-handling.service';

describe('InvitationHandlingService', () => {
  let service: InvitationHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvitationHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
