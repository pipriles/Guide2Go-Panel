import { TestBed, inject } from '@angular/core/testing';

import { AudiosService } from './audios.service';

describe('AudiosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudiosService]
    });
  });

  it('should be created', inject([AudiosService], (service: AudiosService) => {
    expect(service).toBeTruthy();
  }));
});
