import { CustomerDashboardModule } from './customer-dashboard.module';

describe('CustomerDashboardModule', () => {
  let customerDashboardModule: CustomerDashboardModule;

  beforeEach(() => {
    customerDashboardModule = new CustomerDashboardModule();
  });

  it('should create an instance', () => {
    expect(customerDashboardModule).toBeTruthy();
  });
});
