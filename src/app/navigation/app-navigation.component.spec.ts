import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppNavigationComponent} from './app-navigation.component';
import {RouterTestingModule} from '@angular/router/testing';
import {map} from 'rxjs/operators';

describe('AppNavigationComponent', () => {
  let component: AppNavigationComponent;
  let fixture: ComponentFixture<AppNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppNavigationComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout correctly', () => {
    var result;
    component.logout();
    component.logged$.pipe(map(a => (result = a))).subscribe();
    expect(result).toBeFalsy();
  });

  it('navbar toggler should toggle correctly', () => {
    var toggle = component.navbarOpen;
    component.toggleNavbar();
    var untoggle = component.navbarOpen;
    expect(toggle).toBeFalsy();
    expect(untoggle).toBeTruthy();
  });
});
