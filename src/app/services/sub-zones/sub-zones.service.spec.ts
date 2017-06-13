import { TestBed, inject } from '@angular/core/testing';

import { SubZonesService } from './sub-zones.service';

describe('SubZonesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubZonesService]
    });
  });

  it('should be created', inject([SubZonesService], (service: SubZonesService) => {
    expect(service).toBeTruthy();
  }));
});
