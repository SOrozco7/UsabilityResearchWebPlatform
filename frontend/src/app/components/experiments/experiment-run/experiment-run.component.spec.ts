import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentRunComponent } from './experiment-run.component';

describe('ExperimentRunComponent', () => {
  let component: ExperimentRunComponent;
  let fixture: ComponentFixture<ExperimentRunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
