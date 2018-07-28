import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomerDashboardPageComponent} from './customer-dashboard-page.component';

describe('CustomerDashboardPageComponent', () => {
  let component: CustomerDashboardPageComponent;
  let fixture: ComponentFixture<CustomerDashboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerDashboardPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
