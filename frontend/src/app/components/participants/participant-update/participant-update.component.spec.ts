import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipantUpdateComponent } from './participant-update.component';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ScriptService } from '../../../services/script.service';
import { CrudService } from '../../../services/crud.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { AuthService } from '../../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ParticipantUpdateComponent', () => {
  let component: ParticipantUpdateComponent;
  let fixture: ComponentFixture<ParticipantUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantUpdateComponent ],
      imports: [
        RouterTestingModule,
        FormsModule
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
    fixture = TestBed.createComponent(ParticipantUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
