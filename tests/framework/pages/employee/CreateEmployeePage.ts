import { Radio } from "@framework/components/Radio";
import { Switch } from "@framework/components/Switch";
import { TextField } from "@framework/components/TextField";
import { EmployeeForm } from "@framework/pages/employee/EmployeeForm";
import { Locator, Page } from "playwright-core";

export class CreateEmployeePage {
    readonly page: Page;
    readonly userForm: EmployeeForm;
    readonly createLogin: Switch;
    readonly username: TextField;
    readonly statusEnabled: Radio;
    readonly statusDisabled: Radio;
    readonly password: TextField;
    readonly confirmPassword: TextField;
    readonly saveButton: Locator;
    readonly cancelButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.userForm = new EmployeeForm(page);
        this.createLogin = new Switch(page.locator(".oxd-switch-input"));
        this.username = new TextField(page.locator(".oxd-input-group").filter({ hasText: "Username" }));
        this.statusEnabled = new Radio(page.getByRole('radio', { name: 'Enabled' }));
        this.statusDisabled = new Radio(page.getByRole('radio', { name: 'Disabled' }));
        this.password = new TextField(page.locator('.oxd-input-group').filter({ hasText: /^Password$/ }).locator('input'));
        this.confirmPassword = new TextField(page.locator('.oxd-input-group').filter({ hasText: "Confirm Password" }).locator('input'));
        this.saveButton = page.getByRole("button", { name: "Save" });
        this.cancelButton = page.getByRole("button", { name: "Cancel" });
     }
}