import {browser, element, by, ElementFinder} from 'protractor';

export class HelperFunctions {
  checkHeading(expectedText: string): void {
    const hTag = 'h1';
    const hText = element(by.css(hTag)).getText();
    expect(hText).toEqual(expectedText, hTag);
  }

  checkNavigation(expectedNav: string[]): void {
    const actual = element.all(by.css('nav a')).map((x: ElementFinder) => x.getAttribute('textContent'));
    expect(actual).toEqual(expectedNav);
  }

  async tryToLogin(user: {email: string; password: string}, expectedHeading: string, expectedRoute: string) {
    browser.get('/customer/login');
    element(by.css('input[formControlName=email]')).sendKeys(user.email);
    element(by.css('input[formControlName=password]')).sendKeys(user.password);
    element(by.buttonText('Sign in')).click();
    browser.waitForAngularEnabled(false);
    this.checkHeading(expectedHeading);
    const route = await browser.getCurrentUrl();
    const actualRoute = route.split(/[0-9]\/{1}/)[1];
    expect(actualRoute).toEqual(expectedRoute);
    browser.get('');
  }

  async logOut(user: {email: string; password: string}) {
    await this.tryToLogin(user, 'Hello, customer!', 'customer/home');
    const navigationButton = element(by.css('.navbar-toggler'));

    // Check if the button is clickable. It depends of the screensize.
    await navigationButton.click().then(() => {}, () => {});
    await element(by.linkText('Log out')).click();
    browser.get('');
  }
}
