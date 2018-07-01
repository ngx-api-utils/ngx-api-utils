import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHeaderComponent } from './customer-header.component';

describe('CustomerHeaderComponent', () => {
  let component: CustomerHeaderComponent;
  let fixture: ComponentFixture<CustomerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
