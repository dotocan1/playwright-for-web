export async function hideLoaderContainer(page: any) {
    // wait for loader container to stop loading
    let loaderContainer = page.locator('div.loader-container').nth(1);
    await loaderContainer.waitFor({ state: "hidden" });
}