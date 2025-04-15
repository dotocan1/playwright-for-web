import { Page, expect } from "@playwright/test";

export async function hideLoaderContainer(page: any) {

    // wait for loader container to stop loading
    let loaderContainer = page.locator('div.loader-container').nth(1);
    await loaderContainer.waitFor({ state: "hidden" });
}

export async function goToCart(page: any) {

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
    await selectRate.waitFor();
    await selectRate.click();

    // test out if it went to booking process
    const heading = await page.getByRole('heading', { name: 'Select your rate' });
    await heading.waitFor({ state: 'visible' })
}

export async function goToCartQuick(page: Page) {

    // fill in custom values for the URL
    // WARNING: Room availability isnt promised

    const arrival = {
        year: "2025",
        day: "23",
        month: "06"
    }


    const departure = {
        year: "2025",
        day: "26",
        month: "06"
    }

    const url = `https://www.valamar.com/en/hotels-porec/valamar-diamant-hotel/book-rooms?arrive=${arrival.year}-${arrival.month}-${arrival.day}&depart=${departure.year}-${departure.month}-${departure.day}`;

    await page.goto(url);

    try {
        await acceptCookies(page);
    }
    catch (error) {
        await acceptCookies(page);
    }
    // press the detais of the seaview room
    const spanDetails = page.locator('span.app-text', { hasText: 'Details' }).nth(1);
    await spanDetails.waitFor({ state: "attached" });
    await spanDetails.click();

    // select rate to get to booking step
    const selectRate = page.getByLabel('Room for').getByRole('button', { name: 'Select Rate' });
    await selectRate.waitFor();
    await selectRate.click();

    await hideLoaderContainer(page);

    // test out if it went to booking process
    const heading = await page.getByRole('heading', { name: 'Select your rate' });
    await heading.waitFor({ state: 'visible' })
}

export async function LoginUser(page: Page) {
    await page.goto('https://www.valamar.com/');
    await page.getByRole('button', { name: 'Accept cookies' }).click();
    await page.locator("#azureb2c-login").click();
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('textbox', { name: 'E-mail or loyalty card number' }).click();
    // exchange to await page.pause(); if using a different email
    await page.getByRole('textbox', { name: 'E-mail or loyalty card number' }).fill('selective.tortoise.vmfk@letterhaven.net');
    await page.getByRole('textbox', { name: 'Password' }).click();

    // change to await pause() if you are using a different password
    await page.getByRole('textbox', { name: 'Password' }).fill('$Lalal1423');

    // set up the wait for the auth request
    const responsePromise = page.waitForResponse(response =>
        response.url().includes('oauth2/v2.0/token') && response.status() === 200
    );

    await page.getByRole('button', { name: 'Sign in' }).click();

    // wait for the auth request to go through
    const response = await responsePromise;

    // test out to see if redirected to home page
    const heading = page.getByRole('heading', { name: 'Holiday as you are' });
    await expect(heading).toBeVisible();

    await page.waitForTimeout(2000);

    // stops working here

    // go to cart
    await goToCartQuick(page);
}

export async function fillInData(page: Page) {
    await page.getByRole('textbox', { name: 'E-mail address' }).fill('testnimail14231423@gmail.com');
    await page.getByRole('button', { name: 'I don′t want to specify' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('FirstName');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('LastName');
    await page.getByRole('textbox', { name: 'Date of birth' }).fill('01.12.1998y');
    await page.getByRole('button', { name: 'Country' }).click();
    await page.getByRole('option', { name: 'Croatia' }).click();
    await page.getByRole('button', { name: 'Have special requests?' }).click();
    await page.locator('textarea').click();
    await page.locator('textarea').fill('ovo je test');
    await page.getByRole('button', { name: 'Continue to payment' }).click();
    await page.getByRole('textbox', { name: '+385 Mobile phone number' }).fill('14231423');
}

async function acceptCookies(page, retries = 5) {
    try {
        const acceptButton = page.getByRole('button', { name: 'Accept cookies' });
        if (await acceptButton.isVisible()) {
            await acceptButton.click();
        }
    }
    catch (error) {
        if (retries > 0) {
            await acceptCookies(page, retries - 1);
        } else {
            console.error('Failed to accept cookies after multiple attempts:', error);
            throw error;
        }
    }
}
