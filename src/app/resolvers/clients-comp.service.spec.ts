import { TestBed } from '@angular/core/testing';

import { ClientsCompService } from './clients-comp.service';

describe('ClientsCompService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientsCompService = TestBed.get(ClientsCompService);
    expect(service).toBeTruthy();
  });
});
