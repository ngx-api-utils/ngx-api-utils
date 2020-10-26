import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminAuthLayoutComponent} from './admin-auth-layout.component';

describe('AdminAuthLayoutComponent', () => {
  let component: AdminAuthLayoutComponent;
  let fixture: ComponentFixture<AdminAuthLayoutComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AdminAuthLayoutComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
