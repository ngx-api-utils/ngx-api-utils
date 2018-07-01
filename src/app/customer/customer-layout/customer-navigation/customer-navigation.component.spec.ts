import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNavigationComponent } from './customer-navigation.component';

describe('CustomerNavigationComponent', () => {
  let component: CustomerNavigationComponent;
  let fixture: ComponentFixture<CustomerNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
