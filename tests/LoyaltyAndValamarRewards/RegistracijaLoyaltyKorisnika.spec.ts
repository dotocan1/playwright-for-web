import { test, expect } from '@playwright/test';

test('Registracija Loyalty Korisnika', async ({ page }) => {
    // Set default test timeout
    test.setTimeout(120000);

    await page.goto('https://www.valamar.com/');
    await page.getByRole('button', { name: 'Accept cookies' }).click();
    await page.locator("#azureb2c-login").click();
    await page.getByRole('button', { name: 'Join us' }).click();
    await page.pause();
    await page.getByRole('button', { name: 'Send verification code' }).click();
    await page.pause();
    await page.getByRole('button', { name: 'Verify code' }).click();
    await page.getByRole('textbox', { name: 'New Password', exact: true }).fill('$Lalal1423');
    await page.getByRole('textbox', { name: 'New Password', exact: true }).press('Tab');
    await page.getByRole('textbox', { name: 'Confirm New Password' }).fill('$Lalal1423');
    await page.getByText('Other', { exact: true }).click();
    await page.getByRole('textbox', { name: 'First Name' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('FirstName');
    await page.getByRole('textbox', { name: 'First Name' }).press('Tab');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('LastName');
    await page.getByRole('textbox', { name: 'Last Name' }).press('Tab');
    await page.getByRole('textbox', { name: 'Date of Birth' }).fill('01/12/1998');
    await page.getByLabel('Country').selectOption('HR');
    // check the policy checkbox
    await page.evaluate(async () => {
        const ck = document.getElementById("v1_option")
        ck!.click()
    });
    await page.getByRole('textbox', { name: 'Mobile phone number' }).click();
    await page.getByRole('textbox', { name: 'Mobile phone number' }).fill('+3851423142');
    await page.getByRole('button', { name: 'Become a member' }).click();

    // test out to see if redirected to home page
    const heading = page.getByRole('heading', { name: 'Holiday as you are' });
    await heading.waitFor();
    await expect(heading).toBeVisible();
    await page.screenshot({ path: `screenshots/RegistracijaLoyaltyKorisnika.png`, fullPage: false });
});