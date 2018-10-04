import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { CrudService } from '../../../services/crud.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ExperimentUpdateComponent } from './experiment-update.component';

describe('ExperimentUpdateComponent', () => {
  let component: ExperimentUpdateComponent;
  let fixture: ComponentFixture<ExperimentUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentUpdateComponent ],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        AuthService,
        CrudService,
        ErrorHandlerService,
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
