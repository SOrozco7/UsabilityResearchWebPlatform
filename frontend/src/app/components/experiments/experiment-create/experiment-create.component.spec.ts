
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudService } from '../../../services/crud.service';
import { AuthService } from '../../../services/auth.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ExperimentCreateComponent } from './experiment-create.component';
import { LoginComponent } from '../../authentication/login/login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('ExperimentCreateComponent', () => {
  let component: ExperimentCreateComponent;
  let fixture: ComponentFixture<ExperimentCreateComponent>;

  beforeEach(async(() => {

    var userObj = {

      "user": {
        "id": "danperez@gmail.com",
      }
    }

    localStorage.setItem('user', JSON.stringify(userObj.user));

    TestBed.configureTestingModule({
      declarations: [ ExperimentCreateComponent ],
      imports: [ RouterTestingModule, FormsModule ],
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