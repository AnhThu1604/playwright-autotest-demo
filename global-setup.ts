import { LoginPage } from '@framework/pages/LoginPage';
import { chromium } from '@playwright/test';
const URL = process.env.URL;
const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

console.log("=== Global Setup Started ===");

async function globalSetup() {
  console.log("Running global setup...");
  const browser = await chromium.launch({
    headless: process.env.CI ? true : (process.env.HEADLESS === 'true'),
  });

  const page = await browser.newPage();

  // mở trang login
  await page.goto(URL!);
  const login = new LoginPage(page);
  await login.login(username!, password!);
  await page.waitForURL(/dashboard/, {
    timeout: 30000,
  });

  // nhập tài khoản
  // await page.fill('#username', username!);
  // await page.fill('#password', password!);
  // await page.click('button[type="submit"]');

  // chờ login thành công
  // await page.waitForURL('**/');
  // await page.waitForLoadState('domcontentloaded');

  // lưu session/token
  await page.context().storageState({
    path: 'playwright/.auth/user.json',
  });

  await browser.close();
}

export default globalSetup;