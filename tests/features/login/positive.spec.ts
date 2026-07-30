import { test, expect } from "@framework/fixtures/loginFixture";

import dotenv from "dotenv";
dotenv.config();

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

test("Login page", async ({ login }) => {
  await login.login(USERNAME!, PASSWORD!);
  await expect(login.page).toHaveURL(/dashboard/);
});


