import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentUpdateComponent } from './experiment-update.component';

describe('ExperimentUpdateComponent', () => {
  let component: ExperimentUpdateComponent;
  let fixture: ComponentFixture<ExperimentUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentUpdateComponent ]
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
