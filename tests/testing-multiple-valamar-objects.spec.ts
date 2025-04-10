import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    // Go to the target page and accept cookies.
    await page.goto('https://www.valamar.com/en/hotels-resorts');
    await page.getByRole('button', { name: 'Accept cookies' }).click();

    // Get the number of "See details & book" buttons available.
    const buttonsCount = await page.getByRole('button', { name: 'See details & book' }).count();
    console.log('This is the buttons count:', buttonsCount);

    // Loop through a subset or all buttons (adjust as needed).
    const iterations = Math.min(5, buttonsCount);
    for (let i = 0; i < iterations; i++) {
        // Re-fetch the button locator for each iteration (important after navigation).
        const button = page.getByRole('button', { name: 'See details & book' }).nth(i);

        // Wait for navigation to occur when clicking the button.
        await Promise.all([
            button.click(),
        ]);

        // Locate the heading and wait until it's visible.
        const headingLocator = page.locator('h1.hotel-heading');
        await headingLocator.waitFor(); // Ensures the heading is present

        // Retrieve and log the text content of the heading.
        const headingText = await headingLocator.textContent();
        console.log(`Heading text for button ${i}:`, headingText?.trim());

        // Navigate back and wait for the page to load again.
        await Promise.all([
            page.goBack(),
        ]);
    }
});
