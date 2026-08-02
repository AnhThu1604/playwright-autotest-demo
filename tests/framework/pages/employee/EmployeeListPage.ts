import { Locator, Page } from "playwright-core";

export class EmployeeListPage{
    readonly page: Page;
    readonly addButton: Locator;

     constructor(page: Page) {
        this.page = page;
        this.addButton = this.page.getByRole("button", { name: "Add" });

     }

     async openEmployeeListPage(){
        await this.page.getByRole('link', { name: 'PIM' }).click();
     }
     async clickAddButton(){
        await this.addButton.click();
     }
}