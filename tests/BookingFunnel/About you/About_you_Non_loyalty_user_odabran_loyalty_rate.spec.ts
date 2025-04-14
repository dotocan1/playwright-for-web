import { test, expect, Page } from '@playwright/test';
import { url } from 'inspector';
import { goToCart, goToCartQuick, hideLoaderContainer, fillInData } from '../../helper-utils/helper-utils';

test('About you -  Non-loyalty user', async ({ page }) => {
  // Increase the global test timeout.
  test.setTimeout(120000);

  // go to cart page
  await goToCartQuick(page);

  // START THE SELECT RATE MODULE
  // console.log('This is the page url', page.url())
  const bookingUrl = page.url();

  await page.locator('#group-2 span').click();

  await page.getByRole('button', { name: 'Make a reservation' }).click();

  await page.waitForURL(url => url.toString() !== bookingUrl);

  const aboutYouHeading = page.getByRole('heading', { name: 'About you' });
  await aboutYouHeading.waitFor({ state: "visible" });

  // ABOUT YOU NON LOYALTY USER MODULE STARTS HERE

  // fill in data
  await fillInData(page);

  // remove discount
  await page.locator('form').getByRole('img').nth(2).click();

  await hideLoaderContainer(page);

  // go back to remove the discount
  await page.goBack();

  // remove discount
  await page.locator('.toggle').click();

  await page.getByRole('button', { name: 'Make a reservation' }).click();

  await page.waitForURL(url => url.toString() !== bookingUrl);

  await aboutYouHeading.waitFor({ state: "visible" });

  // fill in data again
  await fillInData(page);
  await page.getByRole('button', { name: 'Continue to payment' }).click();

  const bookingUrlAfter = page.url();
  await page.waitForURL(url => url.toString() !== bookingUrlAfter);

  const paymentHeading = page.getByRole('heading', { name: 'Payment Guarantee' });
  await paymentHeading.waitFor({ state: "visible" });

  await page.screenshot({ path: `screenshots/About_you_Non_loyalty_user_odabran_loyalty_rate.png`, fullPage: true });

});
