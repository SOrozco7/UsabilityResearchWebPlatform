import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipantDeleteComponent } from './participant-delete.component';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ScriptService } from '../../../services/script.service';
import { CrudService } from '../../../services/crud.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { AuthService } from '../../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ParticipantDeleteComponent', () => {
  let component: ParticipantDeleteComponent;
  let fixture: ComponentFixture<ParticipantDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantDeleteComponent ],
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
    fixture = TestBed.createComponent(ParticipantDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
