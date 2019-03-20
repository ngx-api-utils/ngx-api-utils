import {browser, element, by, ElementFinder} from 'protractor';

describe('NgxApiUtils tests', () => {
  //fake-api server must be started

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
      checkHeading(1, expectedH1);
    });

    it('Should have the initial navigation', () => {
      checkNavigation(expectedNavigationWhenNotLogged);
    });

    it('Should not log in with invalid credentials', () => {
      tryToLogin(invalidUser, 'Please sign in', 'customer/login');
    });

    it('Customer part should not be visible for unsigned user', () => {
      browser.get('/customer/home');
      checkHeading(1, 'You have to sign in to enter the customer section!');
    });

    it('Should log in and redirect to the customer page', () => {
      tryToLogin(validUser, 'Hello, customer!', 'customer/home');
    });

    it('Navigation menu should be changed after log in', () => {
      checkNavigation(expectedNavigationWhenLogged);
    });
  });

  describe('Successfully log in, log out and cannot reach customer section', () => {
    it(`Should have h1 '${expectedH1}'`, () => {
      checkHeading(1, expectedH1);
    });

    it('Should log in, redirect and change the navigation', () => {
      tryToLogin(validUser, 'Hello, customer!', 'customer/home');
      checkNavigation(expectedNavigationWhenLogged);
    });

    it('Navigation menu should be changed after log out', async () => {
      await logOut();
      checkNavigation(expectedNavigationWhenNotLogged);
    });

    it('Customer part should not be visible', () => {
      browser.get('/customer/home');
      checkHeading(1, `You have to sign in to enter the customer section!`);
    });
  });

  function checkHeading(hLevel: number, expectedText: string): void {
    let hTag = `h${hLevel}`;
    let hText = element(by.css(hTag)).getText();
    expect(hText).toEqual(expectedText, hTag);
  }

  function checkNavigation(expectedNav: string[]): void {
    let actual = element.all(by.css('nav a')).map((x: ElementFinder) => x.getAttribute('textContent'));
    expect(actual).toEqual(expectedNav);
  }

  async function tryToLogin(user: {email: string; password: string}, expectedHeading: string, expectedRoute: string) {
    browser.get('/customer/login');
    element
      .all(by.css('input'))
      .get(0)
      .sendKeys(user.email);
    element
      .all(by.css('input'))
      .get(1)
      .sendKeys(user.password);
    element(by.buttonText('Sign in')).click();
    browser.ignoreSynchronization = true;
    browser.waitForAngular();
    browser.sleep(500);
    checkHeading(1, expectedHeading);
    let route = await browser.getCurrentUrl();
    let actualRoute = route.split(/[0-9]\/{1}/)[1];
    expect(actualRoute).toEqual(expectedRoute);
    browser.get('');
  }

  async function logOut() {
    await tryToLogin(validUser, 'Hello, customer!', 'customer/home');
    let navigationButton = element(by.css('.navbar-toggler'));

    //Check if the button is clickable. It depends of the screensize.
    await navigationButton.click().then(() => {}, () => {});
    await element(by.linkText('Log out')).click();
    browser.get('');
  }
});
