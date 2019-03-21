import {browser} from 'protractor';
import {HelperFunctions} from './helperFunctions';

describe('NgxApiUtils tests', () => {
  let helperFunctions = new HelperFunctions();
  // fake-api server must be started

  beforeAll(() => browser.get(''));

  const expectedH1 = 'Welcome!';
  const expectedTitle = 'NgxApiUtils';
  const expectedNavigationWhenLogged = ['Home', 'Customer section', 'Admin section', 'Log out'];
  const expectedNavigationWhenNotLogged = ['Home', 'Log in', 'Customer section', 'Admin section'];
  const validUser = {email: 'bruno@email.com', password: 'bruno'};
  const invalidUser = {email: 'invalid', password: 'invalid'};

  describe('Successfully log in and reach customer section', () => {
    it(`Should have title '${expectedTitle}'`, () => {
      expect(browser.getTitle()).toEqual(expectedTitle);
    });

    it(`Should have h1 '${expectedH1}'`, () => {
      helperFunctions.checkHeading(expectedH1);
    });

    it('Should have the initial navigation', () => {
      helperFunctions.checkNavigation(expectedNavigationWhenNotLogged);
    });

    it('Should not log in with invalid credentials', () => {
      helperFunctions.tryToLogin(invalidUser, 'Please sign in', 'customer/login');
    });

    it('Customer part should not be visible for unsigned user', () => {
      browser.get('/customer/home');
      helperFunctions.checkHeading('You have to sign in to enter the customer section!');
    });

    it('Should log in and redirect to the customer page', () => {
      helperFunctions.tryToLogin(validUser, 'Hello, customer!', 'customer/home');
    });

    it('Navigation menu should be changed after log in', () => {
      helperFunctions.checkNavigation(expectedNavigationWhenLogged);
    });
  });

  describe('Successfully log in, log out and cannot reach customer section', () => {
    it(`Should have h1 '${expectedH1}'`, () => {
      helperFunctions.checkHeading(expectedH1);
    });

    it('Should log in, redirect and change the navigation', () => {
      helperFunctions.tryToLogin(validUser, 'Hello, customer!', 'customer/home');
      helperFunctions.checkNavigation(expectedNavigationWhenLogged);
    });

    it('Navigation menu should be changed after log out', async () => {
      await helperFunctions.logOut(validUser);
      helperFunctions.checkNavigation(expectedNavigationWhenNotLogged);
    });

    it('Customer part should not be visible', () => {
      browser.get('/customer/home');
      helperFunctions.checkHeading('You have to sign in to enter the customer section!');
    });
  });
});
