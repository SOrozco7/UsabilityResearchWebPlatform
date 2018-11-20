import { TestBed } from '@angular/core/testing';

import { ScriptService } from './script.service';

describe('ScriptService', () => {
  beforeEach(() => TestBed.configureTestingModule({

    providers: [
      ScriptService
    ]
  }));

  it('should be created', () => {
    const service: ScriptService = TestBed.get(ScriptService);
    expect(service).toBeTruthy();
  });
});
