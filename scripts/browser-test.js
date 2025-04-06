import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';

export const options = {
    scenarios: {
        ui: {
            executor: 'ramping-vus',
            exec: 'browserTest',
            stages: [
                { duration: '5s', target: 2 },
                { duration: '10s', target: 2 },
                { duration: '5s', target: 0 }
            ],
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
    thresholds: {
        checks: ['rate==1.0'],
    },
};

export async function browserTest() {
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        await page.goto('https://test.k6.io/my_messages.php');

        await page.locator('input[name="login"]').type('admin');
        await page.locator('input[name="password"]').type('123');

        await Promise.all([page.waitForNavigation(), page.locator('input[type="submit"]').click()]);

        await check(page.locator('h2'), {
            header: async (h2) => (await h2.textContent()) == 'Welcome, admin!',
        });
    } finally {
        await page.close();
    }
}