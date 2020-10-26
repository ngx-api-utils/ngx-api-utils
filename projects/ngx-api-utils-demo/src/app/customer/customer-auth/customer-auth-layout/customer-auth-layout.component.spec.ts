import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CustomerAuthLayoutComponent} from './customer-auth-layout.component';

describe('CustomerAuthLayoutComponent', () => {
  let component: CustomerAuthLayoutComponent;
  let fixture: ComponentFixture<CustomerAuthLayoutComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CustomerAuthLayoutComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
