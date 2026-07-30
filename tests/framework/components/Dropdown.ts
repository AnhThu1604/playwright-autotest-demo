import { Locator } from "@playwright/test";

export class Dropdown {
    readonly locator: Locator;
    readonly errorMsg: Locator;

    constructor(locator: Locator, errorMsg: Locator) {
        this.locator = locator;
        this.errorMsg = errorMsg;
    }

    async selectByOption(text: string) {
        await this.locator.click();
        await this.locator.filter({ hasText: text }).first().click();
    }

    async getSelectedText(): Promise<string | null>{
        return await this.locator.textContent();
    }
    async getErrorMessage(): Promise<string | null> {
        return await this.errorMsg.textContent();
    }
}