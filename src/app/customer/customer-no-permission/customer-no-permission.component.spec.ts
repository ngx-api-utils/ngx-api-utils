import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomerNoPermissionComponent} from './customer-no-permission.component';

describe('CustomerNoPermissionComponent', () => {
  let component: CustomerNoPermissionComponent;
  let fixture: ComponentFixture<CustomerNoPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerNoPermissionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNoPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
