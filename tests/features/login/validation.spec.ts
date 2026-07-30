import { test, expect } from "@framework/fixtures/loginFixture";

test("Login with username & password = null", async ({ login }) => {
  await login.login("", "");
  await login.validateUsernameError("Required");
  await login.validatePasswordError("Required");
});

test("Login with username = null", async ({ login }) => {
  await login.login("", "123");
  await login.validateUsernameError("Required");
});

test("Login with password = null", async ({ login }) => {
  await login.login("admin", "");
  await login.validatePasswordError("Required");
});

test("Login page", async ({ login }) => {
  await login.login("abc", "123");
  await login.validateAlert("Invalid credentials");
});