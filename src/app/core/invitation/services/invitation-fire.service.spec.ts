import { TestBed } from '@angular/core/testing';

import { InvitationFireService } from './invitation-fire.service';

describe('InvitationFireService', () => {
  let service: InvitationFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvitationFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
