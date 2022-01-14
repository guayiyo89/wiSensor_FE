import { TestBed } from '@angular/core/testing';

import { RdrAlertaService } from './rdr-alerta.service';

describe('RdrAlertaService', () => {
  let service: RdrAlertaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdrAlertaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
