import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomerSignInPageComponent} from './customer-sign-in-page.component';

describe('CustomerSignInPageComponent', () => {
  let component: CustomerSignInPageComponent;
  let fixture: ComponentFixture<CustomerSignInPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerSignInPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
