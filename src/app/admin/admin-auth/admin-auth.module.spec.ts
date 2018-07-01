import { AdminAuthModule } from './admin-auth.module';

describe('AdminAuthModule', () => {
  let adminAuthModule: AdminAuthModule;

  beforeEach(() => {
    adminAuthModule = new AdminAuthModule();
  });

  it('should create an instance', () => {
    expect(adminAuthModule).toBeTruthy();
  });
});
