import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipantRetrieveComponent } from './participant-retrieve.component';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ScriptService } from '../../../services/script.service';
import { CrudService } from '../../../services/crud.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { AuthService } from '../../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../material.module';

describe('ParticipantRetrieveComponent', () => {
  let component: ParticipantRetrieveComponent;
  let fixture: ComponentFixture<ParticipantRetrieveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantRetrieveComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        MaterialModule
      ],
      providers: [
        ScriptService,
        CrudService,
        ErrorHandlerService,
        AuthService,
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
