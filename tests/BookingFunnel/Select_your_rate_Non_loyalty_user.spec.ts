import { test, expect } from '@playwright/test';
import { url } from 'inspector';

test('Select your rate - Non-loyalty user', async ({ page }) => {

  // Increase the global test timeout.
  test.setTimeout(120000);

  await page.goto('https://www.valamar.com/');
  await page.getByRole('button', { name: 'Accept cookies' }).click();
  await page.getByText('Where to?').click();
  await page.getByRole('combobox', { name: 'Actions' }).click();
  await page.getByRole('combobox', { name: 'Actions' }).fill('diamant');
  await page.getByRole('option', { name: 'Diamant Hotel 4* Hotels •' }).click();
  await page.locator('#headlessui-popover-panel-10').getByRole('button').filter({ hasText: /^$/ }).click();

  // check days
  await page.locator('span.day', { hasText: '23' }).nth(1).click();
  await page.locator('span.day', { hasText: '26' }).nth(1).click();

  // enter guests data
  await page.getByPlaceholder(' ', { exact: true }).click();
  await page.locator('.children-add').first().click();
  await page.getByRole('button', { name: 'Enter age' }).click();
  await page.getByRole('option', { name: '4', exact: true }).click();
  await page.getByRole('button', { name: 'Find my holiday' }).click();

  // press the detais of the seaview room
  const spanDetails = page.locator('span.app-text', { hasText: 'Details' }).nth(1);
  await spanDetails.waitFor({ state: "attached" });
  await spanDetails.click();

  // select rate to get to booking step
  const selectRate = page.getByLabel('Room for 2+1 Seaview').getByRole('button', { name: 'Select Rate' });
  selectRate.waitFor();
  await selectRate.click();

  // test out if it went to booking process
  const heading = await page.getByRole('heading', { name: 'Select your rate' });
  await heading.waitFor({ state: 'visible' })

  // START THE SELECT RATE MODULE
  // console.log('This is the page url', page.url())
  const bookingUrl = page.url();

  // check if discount checbox is un-checked
  // locator('.toggle-container')
  await page.locator('.toggle').click();
  await page.locator('#group-2 span').click();
  await page.getByRole('button', { name: 'Make a reservation' }).click();

  await page.waitForURL(url => url.toString() !== bookingUrl);

  const aboutYouHeading = page.getByRole('heading', { name: 'About you' });
  await aboutYouHeading.waitFor({ state: "visible" });
  await page.screenshot({ path: 'aboutYouScreenshot.png', fullPage: true });
});