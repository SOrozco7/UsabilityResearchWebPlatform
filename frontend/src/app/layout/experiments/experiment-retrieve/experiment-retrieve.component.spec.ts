import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentRetrieveComponent } from './experiment-retrieve.component';

describe('ExperimentRetrieveComponent', () => {
  let component: ExperimentRetrieveComponent;
  let fixture: ComponentFixture<ExperimentRetrieveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentRetrieveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
