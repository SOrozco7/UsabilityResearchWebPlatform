import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentDeleteComponent } from './experiment-delete.component';

describe('ExperimentDeleteComponent', () => {
  let component: ExperimentDeleteComponent;
  let fixture: ComponentFixture<ExperimentDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
