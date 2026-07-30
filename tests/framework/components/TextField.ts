import { Locator, expect } from "@playwright/test";

export class TextField {
    readonly host: Locator;
    readonly input: Locator;
    readonly errorMsg: Locator;

    // Truyền host (thẻ bao ngoài cùng) thay vì truyền riêng ô input
    constructor(host: Locator) {
        this.host = host;
        this.input = host.getByRole("textbox").or(host.locator("input, textarea"));
        this.errorMsg = host.locator(".oxd-input-group__message");
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
}