import { Locator } from "@playwright/test";

export class Radio {
    readonly locator: Locator;
    readonly errorMsg: Locator;

    constructor(locator: Locator, errorMsg: Locator) {
        this.locator = locator;
        this.errorMsg = errorMsg;
    }

  async selectByLabel(value: string) {
    const option = this.locator.getByLabel(value);
    await option.click();
  }

  async getSelectedValue(): Promise<string | null> {
    const selectedOption = await this.locator.locator('input:checked');
    return selectedOption.getAttribute('value');
  }
}