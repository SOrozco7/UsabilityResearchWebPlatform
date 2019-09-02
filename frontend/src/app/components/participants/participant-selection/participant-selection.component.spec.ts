import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ScriptService } from '../../../services/script.service';
import { CrudService } from '../../../services/crud.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { ParticipantSelectionComponent } from './participant-selection.component';
import { AuthService } from '../../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ParticipantSelectionComponent', () => {

  let component: ParticipantSelectionComponent;
  let fixture: ComponentFixture<ParticipantSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantSelectionComponent ],
      imports: [RouterTestingModule],
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
    fixture = TestBed.createComponent(ParticipantSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
