import { test as base } from "@playwright/test";
import { EmployeePages, createEmployeePages } from "@framework/factories/employeePage.fatory";


type Fixtures = {
    pages: EmployeePages;
};

export const test = base.extend<Fixtures>({
    pages: async ({ page }, use) => {
        await use(createEmployeePages(page));
    }
});
export { expect } from '@playwright/test';