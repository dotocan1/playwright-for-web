
import { test, expect } from '@playwright/test';

const PROPERTY_NAME = "Valamar Diamant Hotel"

test('Homepage → Glavna navigacija → Property listing → Room listing', async ({ page }) => {

    // Increase the global test timeout.
    test.setTimeout(120000);

    await page.goto('https://www.valamar.com/');
    await page.getByRole('button', { name: 'Accept cookies' }).click();
    await page.getByRole('button', { name: 'Hotels & Resorts' }).click();
    await page.getByRole('link', { name: 'All Hotels & Resorts in Poreč' }).click();

    const heading = await page.getByRole('heading', { name: 'Our hotels and apartments in Poreč' });
    await expect(heading).toBeVisible();

    const allSeeDetailsButtons = page.getByRole('button', { name: 'See details & book' });
    const seeDetailsButtonsCount = await allSeeDetailsButtons.count();

    const initialUrl = page.url();
    // for (let i = 0; i < seeDetailsButtonsCount; i++) {
    for (let i = 18; i < seeDetailsButtonsCount; i++) {
        // set current button
        const button = allSeeDetailsButtons.nth(i);
        await button.waitFor()

        // wait for loader container to stop loading
        let loaderContainer = page.locator('div.loader-container').nth(1);
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
            // do something when on Diamant site
            // selectRate(page);
            // press the detais of the seaview room
            const spanDetails = page.locator('span.app-text', { hasText: 'Details' }).nth(1);
            spanDetails.waitFor();
            await spanDetails.click();

            // select rate to get to booking step
            const selectRate = page.getByLabel('Room for 2+1 Seaview').getByRole('button', { name: 'Select Rate' });
            selectRate.waitFor();
            await selectRate.click();

            // test out if it went to booking process
            const heading = await page.getByRole('heading', { name: 'Select your rate' });
            await expect(heading).toBeVisible();
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
    const headingElement = page.getByRole('heading', { name: 'Valamar Diamant Hotel' });
    headingElement.waitFor();
    expect(headingElement).toBeAttached();


}

