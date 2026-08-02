import { Locator } from "@playwright/test";

export class Switch {
    readonly locator: Locator;
  
    constructor(locator: Locator) {
        this.locator = locator;
    }
    async toggle() {
        await this.locator.click();
    }
    async check() {
        const isChecked = await this.isChecked();
        if (!isChecked) {
            await this.toggle();
        }
    }
    async uncheck() {
        const isChecked = await this.isChecked();
        if (isChecked) {
            await this.toggle();
        }
    }

    async isChecked(): Promise<boolean> {
        const checked = await this.locator.getAttribute('aria-checked');
        return checked === 'true';
    }

}