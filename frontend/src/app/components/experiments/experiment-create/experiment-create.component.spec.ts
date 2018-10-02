import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudService } from '../../../services/crud.service';
import { AuthService } from '../../../services/auth.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ExperimentCreateComponent } from './experiment-create.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ExperimentCreateComponent', () => {
  let component: ExperimentCreateComponent;
  let fixture: ComponentFixture<ExperimentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentCreateComponent ],
      imports: [ RouterTestingModule ],
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
    fixture = TestBed.createComponent(ExperimentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
