import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CustomerLoginComponent} from './customer-login.component';
import {ReactiveFormsModule, FormsModule, FormBuilder} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ApiHttpService} from 'ngx-api-utils';
import {ApiHttpServiceMock} from './apiHttpService.mock';

describe('CustomerLoginComponent', () => {
  let component: CustomerLoginComponent;
  let fixture: ComponentFixture<CustomerLoginComponent>;
  const fb: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerLoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{path: 'customer/home', component: CustomerLoginComponent}])
      ],
      providers: [{provide: FormBuilder, useValue: fb}, {provide: ApiHttpService, useClass: ApiHttpServiceMock}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLoginComponent);
    component = fixture.componentInstance;
    component.form = fb.group({
      email: null,
      password: null
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validation should work correct', () => {
    component.form = fb.group({
      email: 'test@test',
      password: 'test'
    });
    expect(component.form.valid).toBeTruthy();
  });

  it('submission should work correct', () => {
    component.form = fb.group({
      email: 'test@test',
      password: 'test'
    });
    fixture.ngZone.run(() => {
      component.onSubmit();
      fixture.detectChanges();
    });
    expect(fixture).toBeTruthy();
  });

  it('submission with invalid form should be unsuccessfull', () => {
    fixture.ngZone.run(() => {
      component.onSubmit();
      fixture.detectChanges();
    });
    expect(component.form.valid).toBeFalsy();
  });
});
