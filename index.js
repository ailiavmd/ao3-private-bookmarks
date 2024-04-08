const puppeteer = require('puppeteer');
require('dotenv').config({path: '.env'});
const logger = require('./util/logger');

let total = 0;
let pageIndex = 1;

const privateBookmarksInScreen = async (page) => {

    // Get ID list
    const ids = await page.$$eval('ol.bookmark.index.group > li',
        (nodes) => nodes.map(el => {
                const classes = [...el.classList];
                const idClass = classes.find(c => c.indexOf('work-') > -1);
                return idClass.split('work-')[1];
            })
    );
    
    for await (id of ids) {

        // Click edit on every fic
        await page.click(`#bookmark_form_trigger_for_${id}`);
        await page.waitForNetworkIdle();
        await page.$eval(`#bookmark_form_placement_for_${id}`, form => form.scrollIntoView());

        const checked = await page.$eval(`#bookmark_form_placement_for_${id} #bookmark_private`, check => check.checked);
        if (checked) logger.info(`${id} is already marked as private`);

        // Checks the private checkbox and submits (if box is unchecked)
        if (!checked) {

            logger.warnLoading(`${id} is public, marking as private...`);

            await page.click(`#bookmark_form_placement_for_${id} #bookmark_private`);
            await page.click(`#bookmark_form_placement_for_${id} input[type="submit"]`);
            await page.waitForNetworkIdle();

            logger.success(`${id} was marked as private`);
            total += 1;

            await page.goBack();
            await page.waitForNetworkIdle();
        }
    }
}

(async () => {

    logger.lenny();
    logger.infoLoading('Initializing...')

    // Launches a browser instance
    const browser = await puppeteer.launch({defaultViewport: null});
    // Creates a new page in the default browser context
    const page = await browser.newPage();
    page.setViewport({
        width: 1920,
        height: 5000
    })

    logger.success('Browser initialized');
    logger.infoLoading('Loggin in...');

    // Go to login page
    await page.goto(`https://archiveofourown.org/users/login`);

    await page.click('#login-dropdown');
    await page.type('#user_session_login_small', process.env.USER);
    await page.type('#user_session_password_small', process.env.PASSWORD);

    await page.click('input[type="submit"][value="Log In"]');
    await page.waitForNetworkIdle();

    if (page.url().indexOf('/users/login') > -1) {
        logger.error('Could not log in. Incorrect Credentials');
        await browser.close();
        return;
    }

    logger.success('Logged in');
    logger.infoLoading('Navigating bookmarks...');

    // Go to bookmarks page
    await page.goto(`https://archiveofourown.org/users/${process.env.USER}/bookmarks`);

    logger.success('Navigated to bookmarks page');
    logger.info(`\nCurrently browsing page ${pageIndex}\n`);

    let nextButton;

    do {

        if (nextButton)  {
            // Goes to next page is button is available
            await page.click('ol.pagination.actions li a[rel="next"]');
            await page.waitForNetworkIdle();
            logger.info(`\nCurrently browsing page ${pageIndex}\n`);
        }

        // Go through every fic in the list
        await privateBookmarksInScreen(page);
        // Check if there is a next page
        nextButton = await page.$('ol.pagination.actions li a[rel="next"]');
        pageIndex += 1;

    } while(nextButton);

    // logs the status of the request to the page
    logger.info('\nBrowsing complete');
    logger.info(`${total} record(s) were marked as private`);

    // Closes the browser instance
    await browser.close();
})();
