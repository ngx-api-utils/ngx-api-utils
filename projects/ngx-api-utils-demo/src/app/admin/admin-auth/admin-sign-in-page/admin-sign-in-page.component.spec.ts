import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminSignInPageComponent} from './admin-sign-in-page.component';

describe('AdminSignInPageComponent', () => {
  let component: AdminSignInPageComponent;
  let fixture: ComponentFixture<AdminSignInPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AdminSignInPageComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
