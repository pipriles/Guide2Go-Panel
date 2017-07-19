import { TestBed, inject } from '@angular/core/testing';

import { IdiomasService } from './idiomas.service';

describe('IdioamsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdiomasService]
    });
  });

  it('should be created', inject([IdiomasService], (service: IdiomasService) => {
    expect(service).toBeTruthy();
  }));
});
