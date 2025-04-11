// Select your rate - Novi loyalty user (registration)
// https://www.valamar.com/en/hotels-porec/valamar-diamant-hotel/book-rooms?arrive=2025-06-23&depart=2025-06-26&roomanchor=249416

import { test, expect } from '@playwright/test';
import { goToCartQuick, hideLoaderContainer } from '../../helper-utils/helper-utils';

test('Select your rate - Novi loyalty user (registration)', async ({ page }) => {

    // Increase the global test timeout.
    test.setTimeout(120000);

    await goToCartQuick(page);

    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('button', { name: 'Join us' }).click();

    await page.pause();
    // await page.getByRole('textbox', { name: 'Email Address' }).fill("aesthetic.panther.yrvp@letterhaven.net");


    await page.getByRole('button', { name: 'Send verification code' }).click();

    await page.pause();
    await page.getByRole('textbox', { name: 'Verification Code' }).click({
        modifiers: ['ControlOrMeta']
    });
    await page.getByRole('button', { name: 'Verify code' }).click();

    await page.getByRole('textbox', { name: 'New Password', exact: true }).fill('$Lalal1423!A');
    await page.getByRole('textbox', { name: 'Confirm New Password' }).fill('$Lalal1423!A');
    await page.getByText('Other', { exact: true }).click();
    await page.getByRole('textbox', { name: 'First Name' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('First');
    await page.getByRole('textbox', { name: 'First Name' }).press('Tab');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Last');
    await page.getByRole('textbox', { name: 'Date of Birth' }).click();
    await page.getByRole('textbox', { name: 'Date of Birth' }).fill('01/11/1998');
    await page.getByLabel('Country').selectOption('HR');
    // await page.getByRole('checkbox').locator('#extension_agreedToTermsOfServiceLoy_v1').check({ force: true });
    // await page.getByLabel('v1', { exact: true }).click();
    // await page.locator('#extension_agreedToTermsOfServiceLoy_v1').check();
    // await page.getByRole('checkbox', { name: 'I agree to terms of service' }).check({ force: true });
    // await page.locator('label[for="extension_agreedToTermsOfServiceLoy_v1"]').click();
    await page.evaluate(async () => {
        const ck = document.getElementById("v1_option")
        ck!.click()
    });
    await page.getByRole('button', { name: 'Become a member' }).click({ force: true });

    // wait for the url to be different from the home page
    // await page.goto('https://www.valamar.com/en/choose-rate?accommodationTypeId=249416&propertyId=246985&arrive=2025-06-23&depart=2025-06-26&adults=2&uuid=31x7wiQYH6F3iwr92Rca4y');

    // check if logged in
    await page.getByText('Already a Valamar Rewards').waitFor({ state: "hidden" })

    // wait for wallet
    // await page.getByText('Wallet credit').waitFor({ state: "visible" })

    await page.locator('#group-1 span').click();

    await page.locator('div:nth-child(2) > div > .switch-container > .toggle-container > .toggle').click();


    await page.getByRole('button', { name: 'Make a reservation' }).click();
    await hideLoaderContainer(page);

    const aboutYouHeading = page.getByRole('heading', { name: 'About you' });
    await aboutYouHeading.waitFor({ state: "visible" });

    await page.screenshot({ path: `screenshots/ReservationAfterRegistrationScreenshot.png`, fullPage: true });
});