import {CustomerAuthModule} from './customer-auth.module';

describe('CustomerAuthModule', () => {
  let customerAuthModule: CustomerAuthModule;

  beforeEach(() => {
    customerAuthModule = new CustomerAuthModule();
  });

  it('should create an instance', () => {
    expect(customerAuthModule).toBeTruthy();
  });
});
