import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHeaderComponent } from './public-header.component';

describe('PublicHeaderComponent', () => {
  let component: PublicHeaderComponent;
  let fixture: ComponentFixture<PublicHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
