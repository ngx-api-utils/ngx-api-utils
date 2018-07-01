import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSignUpPageComponent } from './customer-sign-up-page.component';

describe('CustomerSignUpPageComponent', () => {
  let component: CustomerSignUpPageComponent;
  let fixture: ComponentFixture<CustomerSignUpPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSignUpPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSignUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
