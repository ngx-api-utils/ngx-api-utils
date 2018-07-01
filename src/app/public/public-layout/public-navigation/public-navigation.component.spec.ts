import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicNavigationComponent } from './public-navigation.component';

describe('PublicNavigationComponent', () => {
  let component: PublicNavigationComponent;
  let fixture: ComponentFixture<PublicNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
