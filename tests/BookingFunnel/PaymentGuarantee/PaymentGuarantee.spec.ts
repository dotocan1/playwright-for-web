import { test, expect } from '@playwright/test';
import { url } from 'inspector';
import { goToCart, goToCartQuick, fillInData } from '../../helper-utils/helper-utils';
const fs = require('fs'); // Import the file system module

test('Payment Guarantee', async ({ page }) => {
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

  // fill in data
  await fillInData(page);
  await page.getByRole('button', { name: 'Continue to payment' }).click();

  const paymentHeading = page.getByRole('heading', { name: 'Payment Guarantee' });
  await paymentHeading.waitFor({ state: "visible" });

  // PAYMENT MODULE STARTS HERE

  await page.locator('iframe[name="saved-card-component"]').contentFrame().getByRole('textbox', { name: '**** **** **** ****' }).fill('4111 1111 1111 1111');
  await page.locator('iframe[name="saved-card-component"]').contentFrame().getByRole('textbox', { name: 'MM/GG' }).click();
  await page.locator('iframe[name="saved-card-component"]').contentFrame().getByRole('textbox', { name: 'MM/GG' }).fill('12/29');
  await page.locator('iframe[name="saved-card-component"]').contentFrame().getByRole('textbox', { name: '***', exact: true }).fill('123');
  await page.locator('#payment-form').getByRole('img').click();

  await page.getByRole('button', { name: 'Confirm reservation' }).click();

  // BOOKING CONFIRMATION MODULE STARTS HERE

  await page.getByRole('button', { name: 'Reservation details' }).click();
  const reservation = page.getByText('Reservation number: ');
  const reservationCode = await reservation.textContent();

  await page.getByRole('button', { name: 'Included in the price' }).click();
  await page.getByRole('button', { name: 'Booking Policies' }).click();
  await page.getByRole('button', { name: 'Getting here' }).click();
  // press again to close it
  // await page.getByRole('button', { name: 'Getting here' }).click();

  const filePath = 'reservations.txt'; // Define the target file

  // Append the text to the file
  fs.appendFile(filePath, '\n' + reservationCode + '\n', (err) => {
    if (err) {
      // If an error occurred, log the error
      console.error('Error appending to file:', err);
    } else {
      // Otherwise, confirm the success of the operation
      console.log('Text appended successfully.');
    }
  });

  await page.screenshot({ path: `screenshots/PaymentGuarantee.png`, fullPage: true });

});




