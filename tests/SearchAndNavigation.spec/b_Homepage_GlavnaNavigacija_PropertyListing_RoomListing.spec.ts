
import { test, expect } from '@playwright/test';

const PROPERTY_NAME = "Valamar Diamant Hotel"

test('Homepage → Glavna navigacija → Property listing → Room listing', async ({ page }) => {

    // Increase the global test timeout.
    test.setTimeout(120000);

    await page.goto('https://www.valamar.com/');
    await page.getByRole('button', { name: 'Accept cookies' }).click();
    await page.getByRole('button', { name: 'Hotels & Resorts' }).click();
    await page.getByRole('link', { name: 'All Hotels & Resorts in Poreč' }).click();
    // wait for loader container to stop loading
    let loaderContainer = page.locator('div.loader-container').nth(1);
    await loaderContainer.waitFor({ state: "hidden" });

    const heading = page.getByRole('heading', { name: 'Our hotels and apartments in Poreč' });
    await heading.waitFor({ state: "visible" });

    const allSeeDetailsButtons = page.getByRole('button', { name: 'See details & book' });
    const seeDetailsButtonsCount = await allSeeDetailsButtons.count();

    const initialUrl = page.url();
    for (let i = 0; i < seeDetailsButtonsCount; i++) {
        // for (let i = 19; i < seeDetailsButtonsCount; i++) {
        // set current button
        const button = allSeeDetailsButtons.nth(i);
        await button.waitFor()

        // wait for loader container to stop loading
        loaderContainer = page.locator('div.loader-container').nth(1);
        await loaderContainer.waitFor({ state: "hidden" });

        // click the button
        await button.click();

        // wait for the url to be different from the home page
        await page.waitForURL(url => url.toString() !== initialUrl);

        // wait for loader container to stop loading
        loaderContainer = page.locator('div.loader-container').nth(1);
        await loaderContainer.waitFor({ state: "hidden" });

        const propertyHeading = page.getByRole('heading');
        await propertyHeading.waitFor();
        const headingText = await propertyHeading.textContent();
        console.log("prop heading", headingText);

        if (headingText == PROPERTY_NAME) {
            // select rate when on Diamant site
            await selectRate(page);
            break;
        } else {
            await page.goBack();
            await page.waitForURL(url => url.toString() == initialUrl);
        }
    }

    // const propertyHeading = await page.gme: 'Valamar Diamant Hotel' });
    // // await page.getByRole('button', { name: 'Details' }).click();

});

async function selectRate(page: any) {
    // press the detais of the seaview room
    // TODO: Need to iterate to get to this nth(3)
    const spanDetails = page.locator('span.app-text', { hasText: 'Details' }).nth(3);
    spanDetails.waitFor();
    await spanDetails.click();

    // choose dates
    await page.locator(
        'div.dialog-overlay-container:has(h4:has-text("Room for 2")) button:has-text("Choose dates")'
    ).click();

    // next month
    await page.getByRole('button').filter({ hasText: /^$/ }).click();

    // check days
    const firstDay = page.locator('span.day', { hasText: '23' }).nth(1);
    firstDay.waitFor();
    const secondDay = page.locator('span.day', { hasText: '26' }).nth(1);
    secondDay.waitFor();
    await firstDay.click();
    await secondDay.click();
    await page.getByRole('button', { name: 'Confirm' }).click();

    // go to details again
    spanDetails.waitFor();
    await spanDetails.click();

    // select rate to get to booking step
    const selectRate = page.getByLabel('Room for 2 Seaview').getByRole('button', { name: 'Select Rate' })
    selectRate.waitFor({ state: "attached" });
    await selectRate.click();

    // test out if it went to booking process
    const heading = await page.getByRole('heading', { name: 'Select your rate' });
    await expect(heading).toBeVisible();


}

