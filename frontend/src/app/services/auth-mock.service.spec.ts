import { TestBed } from '@angular/core/testing';

import { AuthMockService } from './auth-mock.service';

describe('AuthMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthMockService = TestBed.get(AuthMockService);
    expect(service).toBeTruthy();
  });
});
