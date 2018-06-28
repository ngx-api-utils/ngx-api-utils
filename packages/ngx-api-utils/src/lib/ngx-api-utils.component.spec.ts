import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxApiUtilsComponent } from './ngx-api-utils.component';

describe('NgxApiUtilsComponent', () => {
  let component: NgxApiUtilsComponent;
  let fixture: ComponentFixture<NgxApiUtilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxApiUtilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxApiUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
