import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCreateComponent } from './question-create.component';

import {ErrorHandlerService } from '../../../services/error-handler.service';

import {CrudService } from '../../../services/crud.service';
import {AuthService } from '../../../services/auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { MaterialModule } from '../../../material.module';
import { BrowserModule } from '@angular/platform-browser';

describe('QuestionCreateComponent', () => {
  let component: QuestionCreateComponent;
  let fixture: ComponentFixture<QuestionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCreateComponent ],
    

    imports: [RouterTestingModule, BrowserModule, CommonModule, FormsModule],
      providers: [

        AuthService,
        CrudService,
        ErrorHandlerService,
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionCreateComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
