import { Locator, Page } from "playwright-core";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.URL
   ? process.env.URL.replace(/\/web\/index\.php\/.*$/, '')
   : '';

const PIM_URL = `${BASE_URL}/web/index.php/pim/viewEmployeeList`;

export class EmployeeListPage {
   readonly page: Page;
   readonly addButton: Locator;
   readonly addEmployeeButton: Locator;
   constructor(page: Page) {
      this.page = page;
      this.addButton = this.page.getByRole("button", { name: "Add" });
      this.addEmployeeButton = this.page.getByRole("button", { name: "Add Employee" });
   }

   async openEmployeeListPage() {
      await this.page.goto(PIM_URL);
      await this.page.waitForURL(/pim\/viewEmployeeList/, { timeout: 30000 });
      await this.addButton.waitFor({ state: 'visible', timeout: 30000 });
   }

   async clickAddButton() {
      await this.addButton.waitFor({ state: 'visible', timeout: 30000 });
      await this.addButton.click();
   }

   async clickAddEmployeeButton() {
      await this.addEmployeeButton.waitFor({ state: 'visible', timeout: 30000 });
      await this.addEmployeeButton.click();
   }

}
