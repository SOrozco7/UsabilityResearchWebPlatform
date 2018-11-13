import { TestBed } from '@angular/core/testing';
import { CrudService } from './crud.service';
import { AuthService } from './auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({

    providers: [
      CrudService,
      AuthService,
      HttpClient,
      HttpHandler
    ]
  }));

  it('should be created', () => {
    const service: CrudService = TestBed.get(CrudService);
    expect(service).toBeTruthy();
  });
});
