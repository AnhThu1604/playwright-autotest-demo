import { TextField } from "@framework/components/TextField";
import { Locator, Page } from "playwright-core";

export class EmployeeForm {
   readonly page: Page;
   readonly avt: Locator;
   readonly firstName: TextField;
   readonly middleName: TextField;
   readonly lastName: TextField;
   readonly employeeId: TextField;

   constructor(page: Page) {
      this.page = page;
      this.avt = this.page.locator('.oxd-file-input');
      this.firstName = new TextField(page.getByRole("textbox", { name: "First Name" }));
      this.middleName = new TextField(page.getByRole("textbox", { name: "Middle Name" }));
      this.lastName = new TextField(page.getByRole("textbox", { name: "Last Name" }));
      this.employeeId = new TextField(page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }));
   }
   async fillFirstName(firstName: string) {
      await this.firstName.fill(firstName);
   }
   async fillMiddleName(middleName: string) {
      await this.middleName.fill(middleName);
   }
   async fillLastName(lastName: string) {
      await this.lastName.fill(lastName);
   }
   async fillEmployeeId(employeeId: string) {
      await this.employeeId.fill(employeeId);
   }

}