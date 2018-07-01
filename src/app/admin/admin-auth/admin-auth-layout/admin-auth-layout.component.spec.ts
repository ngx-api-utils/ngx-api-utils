import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthLayoutComponent } from './admin-auth-layout.component';

describe('AdminAuthLayoutComponent', () => {
  let component: AdminAuthLayoutComponent;
  let fixture: ComponentFixture<AdminAuthLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAuthLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
