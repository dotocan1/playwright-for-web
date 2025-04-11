import { test, expect } from '@playwright/test';
import { url } from 'inspector';
import { goToCart } from '../../helper-utils/helper-utils';

test('Select your rate - Non-loyalty user', async ({ page }) => {
  // Increase the global test timeout.
  test.setTimeout(120000);

  // go to cart page
  await goToCart(page);

  // START THE SELECT RATE MODULE
  // console.log('This is the page url', page.url())
  const bookingUrl = page.url();

  await page.locator('#group-2 span').click();
  await page.getByRole('button', { name: 'Make a reservation' }).click();

  await page.waitForURL(url => url.toString() !== bookingUrl);

  const aboutYouHeading = page.getByRole('heading', { name: 'About you' });
  await aboutYouHeading.waitFor({ state: "visible" });
  await page.screenshot({ path: 'aboutYouScreenshot.png', fullPage: true });
});