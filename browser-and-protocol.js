import { browser } from 'k6/browser'
import { check } from 'k6'
import http from 'k6/http'

export const options = {
    scenarios: {
        browser: {
            executor: 'per-vu-iterations',
            exec: 'browserTest',
            options: {
                browser: {
                    type: 'chromium',
                    headless: false
                }
            }
        },
        protocol: {
            executor: 'constant-vus',
            exec: 'protocolTest',
            vus: 20,
            duration: '10s'
        }
    }
}

export async function browserTest() {
    const context = await browser.newContext();
    const page = await context.newPage();


    await page.goto('https://otel-demo.field-eng.grafana.net/')

    const productCard = page.locator('(//div[@data-cy="product-card"])[1]')
    await productCard.click()

    const quantityOption = page.locator('[data-cy="product-quantity"]')
    quantityOption.selectOption('3')

    const addToCardBtn = page.locator('[data-cy="product-add-to-cart"]')
    await addToCardBtn.click()

    check(page, {
        'cart item name': page => page.locator('//p[text()="National Park Foundation Explorascope"]').isVisible() === true,
        'cart item quantity': page => page.locator('//p[text()="3"]').isVisible() === true
    })

    page.close()
}

export function protocolTest() {
    const res = http.get('https://k6.io')

    check(res, {
        'status is 200': res => res.status === 200
    })
}