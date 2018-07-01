import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLayoutComponent } from './customer-layout.component';

describe('CustomerLayoutComponent', () => {
  let component: CustomerLayoutComponent;
  let fixture: ComponentFixture<CustomerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
