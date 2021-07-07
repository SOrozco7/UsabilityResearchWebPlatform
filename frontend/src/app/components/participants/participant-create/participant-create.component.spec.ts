import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipantCreateComponent } from './participant-create.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ScriptService } from '../../../services/script.service';
import { CrudService } from '../../../services/crud.service';
import { FormsModule } from '@angular/forms';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { AuthService } from '../../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ParticipantCreateComponent', () => {
  let component: ParticipantCreateComponent;
  let fixture: ComponentFixture<ParticipantCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantCreateComponent ],
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
    fixture = TestBed.createComponent(ParticipantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
