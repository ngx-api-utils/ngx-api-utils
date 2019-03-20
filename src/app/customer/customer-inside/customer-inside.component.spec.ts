import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomerInsideComponent} from './customer-inside.component';

describe('CustomerInsideComponent', () => {
  let component: CustomerInsideComponent;
  let fixture: ComponentFixture<CustomerInsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerInsideComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
