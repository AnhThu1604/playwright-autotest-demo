import { test, expect } from "@framework/fixtures/loginFixture";

import dotenv from "dotenv";
dotenv.config();

const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

test("Login page", async ({ login }) => {
  await login.login(username!, password!);
  await expect(login.page).toHaveURL(/dashboard/,
    { timeout: 30000 }
  );
});


