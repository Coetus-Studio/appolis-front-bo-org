import { TestBed } from '@angular/core/testing';

import { MapOrgService } from './map-org.service';

describe('MapOrgService', () => {
  let service: MapOrgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapOrgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
