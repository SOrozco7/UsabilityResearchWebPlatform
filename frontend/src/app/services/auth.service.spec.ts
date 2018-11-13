import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AuthService', () => {

  beforeEach(() => TestBed.configureTestingModule({

    providers: [
      AuthService,
      HttpClient,
      HttpHandler
    ]

  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
