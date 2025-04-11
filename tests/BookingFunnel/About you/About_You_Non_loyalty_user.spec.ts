import { test, expect } from '@playwright/test';
import { url } from 'inspector';
import { goToCart, goToCartQuick } from '../../helper-utils/helper-utils';

test('About you -  Non-loyalty user', async ({ page }) => {
  // Increase the global test timeout.
  test.setTimeout(120000);

  // go to cart page
  await goToCartQuick(page);

  // START THE SELECT RATE MODULE
  // console.log('This is the page url', page.url())
  const bookingUrl = page.url();

  // turn discount on
  await page.locator('.toggle').click();

  await page.locator('#group-2 span').click();
  await page.getByRole('button', { name: 'Make a reservation' }).click();

  await page.waitForURL(url => url.toString() !== bookingUrl);

  const aboutYouHeading = page.getByRole('heading', { name: 'About you' });
  await aboutYouHeading.waitFor({ state: "visible" });

  // ABOUT YOU NON LOYALTY USER MODULE STARTS HERE

  await page.getByRole('textbox', { name: 'E-mail address' }).fill('testnimail14231423@gmail.com');
  await page.getByRole('button', { name: 'I don′t want to specify' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('FirstName');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('LastName');
  await page.getByRole('textbox', { name: 'Date of birth' }).fill('01.12.1998y');
  await page.getByRole('button', { name: 'Country Select country' }).click();
  await page.getByRole('option', { name: 'Croatia' }).click();
  await page.getByRole('button', { name: 'Have special requests?' }).click();
  await page.locator('textarea').click();
  await page.locator('textarea').fill('ovo je test');
  await page.getByRole('button', { name: 'Continue to payment' }).click();
  await page.getByRole('textbox', { name: '+385 Mobile phone number' }).fill('14231423');
  await page.getByRole('button', { name: 'Continue to payment' }).click();

  const paymentHeading = page.getByRole('heading', { name: 'Payment Guarantee' });
  await paymentHeading.waitFor({ state: "visible" });

  await page.screenshot({ path: `screenshots/About_You_Non_loyalty_user_Screenshot.png`, fullPage: true });

});
