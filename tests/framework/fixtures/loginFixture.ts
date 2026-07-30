import { test as base } from "@playwright/test";
import { LoginPage } from "@framework/pages/LoginPage";

type Fixtures = {
    login: LoginPage;
};

export const test = base.extend<Fixtures>({
    login: async ({ page }, use) => {
        const login = new LoginPage(page);

        await login.open();

        await use(login);
    },
});

export { expect } from "@playwright/test";
