import { Locator } from "@playwright/test";

export class Radio {
    readonly locator: Locator;
    

    constructor(locator: Locator) {
        this.locator = locator;
      
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