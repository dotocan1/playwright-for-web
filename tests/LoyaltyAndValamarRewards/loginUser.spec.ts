import { test, expect } from '@playwright/test';
import { goToCartQuick } from '../helper-utils/helper-utils'
import { console } from 'node:inspector/promises';

test('test', async ({ page }) => {
    // Set default test timeout
    test.setTimeout(120000);

    await page.goto('https://www.valamar.com/');
    await page.getByRole('button', { name: 'Accept cookies' }).click();
    await page.locator("#azureb2c-login").click();
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('textbox', { name: 'E-mail or loyalty card number' }).click();
    // await page.pause();
    await page.getByRole('textbox', { name: 'E-mail or loyalty card number' }).fill('selective.tortoise.vmfk@letterhaven.net');
    await page.getByRole('textbox', { name: 'Password' }).click();

    // change to await pause() if you are using a different password
    await page.getByRole('textbox', { name: 'Password' }).fill('$Lalal1423');

    // start

    const responsePromise = page.waitForResponse(response =>
        response.url().includes('oauth2/v2.0/token') && response.status() === 200
    );


    await page.getByRole('button', { name: 'Sign in' }).click();

    const response = await responsePromise;

    // await page.pause();

    // end

    // test out to see if redirected to home page
    const heading = page.getByRole('heading', { name: 'Holiday as you are' });
    await expect(heading).toBeVisible();

    // stops working here

    // go to cart
    await goToCartQuick(page);

    await page.screenshot({ path: `screenshots/loginuser.png`, fullPage: true });

});