import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CustomerSignInPageComponent} from './customer-sign-in-page.component';

describe('CustomerSignInPageComponent', () => {
  let component: CustomerSignInPageComponent;
  let fixture: ComponentFixture<CustomerSignInPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CustomerSignInPageComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
