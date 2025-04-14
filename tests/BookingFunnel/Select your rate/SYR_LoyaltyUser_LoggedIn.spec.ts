import { test, expect } from '@playwright/test';
import { LoginUser } from '../../helper-utils/helper-utils';

test('Select your rate - Loyalty user (logged-in)', async ({ page }) => {
    // Set default test timeout
    test.setTimeout(120000);

    await LoginUser(page);

    await page.getByRole('textbox', { name: 'Add' }).fill('6209-TEST-1231');
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('button', { name: 'Make a reservation' }).click();

    const heading = page.getByRole('heading', { name: 'About you' });
    await expect(heading).toBeVisible();

    await page.screenshot({ path: 'screenshots/SYR_LoyaltyUser_LoggedIn.png', fullPage: true });
});