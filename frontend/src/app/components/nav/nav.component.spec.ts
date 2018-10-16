import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { Router } from '@angular/router';
import { RouterStub } from '../../router-stub';
import { BrowserModule, By } from '@angular/platform-browser';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      providers: [
        {provide: Router, useClass: RouterStub}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The logout() method should be called if the \'Log out\' button is clicked', async(() => {

    spyOn(component, 'logout');
    htmlElement = fixture.debugElement.query(By.css('.btn.btn-danger.float-right.logoutBtn')).nativeElement;
    htmlElement.click();
    expect(component.logout).toHaveBeenCalled();
  }));

});
