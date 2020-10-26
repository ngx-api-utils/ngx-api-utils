import {PublicModule} from './public.module';

describe('PublicModule', () => {
  let publicModule: PublicModule;

  beforeEach(() => {
    publicModule = new PublicModule();
  });

  it('should create an instance', () => {
    expect(publicModule).toBeTruthy();
  });
});
