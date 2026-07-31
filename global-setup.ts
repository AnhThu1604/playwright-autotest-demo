import { chromium } from '@playwright/test';
const URL = process.env.URL;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

async function globalSetup() {
  const browser = await chromium.launch({
    headless: process.env.CI ? true : (process.env.HEADLESS === 'true'),
  });

  const page = await browser.newPage();

  // mở trang login
  await page.goto(URL!);

  // nhập tài khoản
  await page.fill('#username', username!);

  await page.fill('#password', password!);

  // click login
  await page.click('button[type="submit"]');

  // chờ login thành công
  await page.waitForURL('**/');
  await page.waitForLoadState('domcontentloaded');

  // lưu session/token
  await page.context().storageState({
    path: 'playwright/.auth/user.json',
  });

  await browser.close();
}

export default globalSetup;