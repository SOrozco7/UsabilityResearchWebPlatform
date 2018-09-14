import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentCreateComponent } from './experiment-create.component';

describe('ExperimentCreateComponent', () => {
  let component: ExperimentCreateComponent;
  let fixture: ComponentFixture<ExperimentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentCreateComponent ]
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
