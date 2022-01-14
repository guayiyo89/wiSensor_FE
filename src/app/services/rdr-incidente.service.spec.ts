import { TestBed } from '@angular/core/testing';

import { RdrIncidenteService } from './rdr-incidente.service';

describe('RdrIncidenteService', () => {
  let service: RdrIncidenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdrIncidenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
