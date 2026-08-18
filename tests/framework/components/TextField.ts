import { Locator, expect } from "@playwright/test";

export class TextField {
    readonly host: Locator;
    readonly input: Locator;
    readonly errorMsg: Locator;

    constructor(host: Locator) {
        this.host = host;
        this.input = host.locator('xpath=self::input | self::textarea | .//input | .//textarea').first();
        const container = host.locator('xpath=self::*[contains(@class, "oxd-input-group")] | ./ancestor::*[contains(@class, "oxd-input-group")][1]');
        this.errorMsg = container.locator('.oxd-input-group__message').first();
    }

    async fill(text: string) {
        await this.input.fill(text);
    }

    async type(value: string, delay = 50) {
        await this.input.pressSequentially(value, { delay });
    }

    async clear() {
        await this.input.clear();
    }

    async getValue(): Promise<string> {
        return await this.input.inputValue();
    }

    async getErrorMessage(): Promise<string | null> {
        return await this.errorMsg.textContent();
    }

    async expectErrorMessage(expectedMessage: string) {
        await expect(this.errorMsg).toHaveText(expectedMessage);
    }

    async expectValue(expectedValue: string) {
        await expect(this.input).toHaveValue(expectedValue);
    }
}