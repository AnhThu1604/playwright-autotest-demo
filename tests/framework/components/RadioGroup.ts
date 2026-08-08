import { Page, expect } from "@playwright/test";

export class RadioGroup {

  constructor(private page: Page) { }

  async select(value: string) {
    if (value) {
      await this.page
        .getByLabel(value, { exact: true })
        .check();
    } else {
      await this.page.keyboard.press("Escape");
    }
  }
  async valueDefaultNotCheck(value: string) {
    await expect(this.page.getByLabel(value, { exact: true })).not.toBeChecked();
  }
  async valueDefaultCheck(value: string) {
    await expect(this.page.getByLabel(value, { exact: true })).toBeChecked();
  }

  async expectValue(value: string) {
    await expect(this.page.getByLabel(value, { exact: true })).toBeChecked();
  }
}