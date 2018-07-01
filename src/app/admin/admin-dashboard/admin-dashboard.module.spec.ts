import { AdminDashboardModule } from './admin-dashboard.module';

describe('AdminDashboardModule', () => {
  let adminDashboardModule: AdminDashboardModule;

  beforeEach(() => {
    adminDashboardModule = new AdminDashboardModule();
  });

  it('should create an instance', () => {
    expect(adminDashboardModule).toBeTruthy();
  });
});
