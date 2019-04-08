import { TestBed } from '@angular/core/testing';

import { NoteServiceService } from './note-service.service';

describe('NoteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoteServiceService = TestBed.get(NoteServiceService);
    expect(service).toBeTruthy();
  });
});
