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

export async function goToCartQuick(page: any) {

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

    await page.goto(`https://www.valamar.com/en/hotels-porec/valamar-diamant-hotel/book-rooms?arrive=${arrival.year}-${arrival.month}-${arrival.day}&depart=${departure.year}-${departure.month}-${departure.day}`);


    await page.getByRole('button', { name: 'Accept cookies' }).click();

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