
import { test, expect } from '@playwright/test';

test('Homepage → Glavna navigacija → Property listing → Room listing', async ({ page }) => {
    await page.goto('https://www.valamar.com/');
    await page.getByRole('button', { name: 'Accept cookies' }).click();
    await page.getByRole('button', { name: 'Hotels & Resorts' }).click();
    await page.getByRole('link', { name: 'All Hotels & Resorts in Poreč' }).click();

    const heading = await page.getByRole('heading', { name: 'Our hotels and apartments in Poreč' });
    await expect(heading).toBeVisible();

    const allSeeDetailsButtons = page.getByRole('button', { name: 'See details & book' });
    const seeDetailsButtonsCount = await allSeeDetailsButtons.count();

    const initialUrl = page.url();
    for (let i = 0; i < seeDetailsButtonsCount; i++) {
        const button = allSeeDetailsButtons.nth(i);
        console.log('this is button: ', button)

        await button.click();
        await page.waitForURL(url => url.toString() !== initialUrl);
        await page.waitForLoadState('domcontentloaded');

        const propertyHeading = await page.getByRole('heading');

        // const propertyHeading = await page.getByRole('heading', { name: 'Valamar Diamant Hotel' });
        const isVisible = propertyHeading.isVisible();
        if (!isVisible) {
            await page.goBack();
            await page.waitForURL(url => url.toString() == initialUrl);
            await page.waitForLoadState('domcontentloaded');
        }


    }


    // // await page.getByRole('button', { name: 'Details' }).click();

});
