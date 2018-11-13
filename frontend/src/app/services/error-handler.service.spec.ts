import { TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({

    providers: [
      ErrorHandlerService
    ]

  }));

  it('should be created', () => {
    const service: ErrorHandlerService = TestBed.get(ErrorHandlerService);
    expect(service).toBeTruthy();
  });
});
