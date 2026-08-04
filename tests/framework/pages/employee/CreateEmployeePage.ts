import { Radio } from "@framework/components/Radio";
import { Switch } from "@framework/components/Switch";
import { TextField } from "@framework/components/TextField";
import { ERROR_MSG } from "@framework/constants/errorMsg";
import { Status } from "@framework/constants/status";
import { Employee } from "@framework/models/Employee";
import { EmployeeForm } from "@framework/pages/employee/EmployeeForm";
import { Locator, Page, expect } from "@playwright/test";

export class CreateEmployeePage {
    readonly page: Page;
    readonly userForm: EmployeeForm;
    readonly createAccountLogin: Switch;
    readonly username: TextField;
    // readonly statusEnabled: Radio;
    // readonly statusDisabled: Radio;
    readonly status: Radio;
    readonly password: TextField;
    readonly confirmPassword: TextField;
    readonly saveButton: Locator;
    readonly cancelButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.userForm = new EmployeeForm(page);
        this.createAccountLogin = new Switch(page.locator(".oxd-switch-input"));
        this.username = new TextField(page.locator(".oxd-input-group").filter({ hasText: "Username" }));
        //this.statusEnabled = new Radio(page.getByRole('radio', { name: 'Enabled' }));
        //this.statusDisabled = new Radio(page.getByRole('radio', { name: 'Disabled' }));
        this.status = new Radio(page.getByLabel('Status'));
        this.password = new TextField(page.locator('.oxd-input-group').filter({ hasText: /^Password$/ }).locator('input'));
        this.confirmPassword = new TextField(page.locator('.oxd-input-group').filter({ hasText: "Confirm Password" }).locator('input'));
        this.saveButton = page.getByRole("button", { name: "Save" });
        this.cancelButton = page.getByRole("button", { name: "Cancel" });
    }

    async fillUsername(username: string) {
        await this.username.fill(username);
    }
    async fillPassword(password: string) {
        await this.password.fill(password);
    }
    async fillConfirmPassword(confirmPassword: string) {
        await this.confirmPassword.fill(confirmPassword);
    }
    async clickSaveButton() {
        await this.saveButton.waitFor({ state: 'visible', timeout: 15000 });
        await this.saveButton.click();
    }
    async clickCancelButton() {
        await this.cancelButton.click();
    }

    async fillEmployInfo(firstName: string, middleName: string, lastName: string, employeeId?: string) {
        await this.userForm.firstName.input.waitFor({ state: 'visible', timeout: 15000 });
        await this.userForm.fillFirstName(firstName);
        await this.userForm.fillMiddleName(middleName);
        await this.userForm.fillLastName(lastName);
        if (employeeId) {
            await this.userForm.fillEmployeeId(employeeId);
        }
    }
    async fillAccountInfo(username: string, status: Status, password: string, confirmPassword: string) {
        await this.username.fill(username);
        await this.status.selectByLabel(status);
        await this.password.fill(password);
        await this.confirmPassword.fill(confirmPassword);
    }
    async fillCreateUser(employee: Employee, isCreateAccount: boolean) {
        await this.fillEmployInfo(employee.firstName, employee.middleName, employee.lastName, employee.employeeId);
        if (isCreateAccount) {
            await this.createAccountLogin.check();
            await this.fillAccountInfo(employee.user.username, employee.user.status, employee.user.password, employee.user.confirmPassword);
        }
    }
    async createEmployee(employee: Employee, isCreateAccount: boolean) {
        await this.fillCreateUser(employee, isCreateAccount);
        await this.clickSaveButton();

    }

    async expectDefaulValueForm() {
        await this.userForm.firstName.expectValue("");
        await this.userForm.middleName.expectValue("");
        await this.userForm.lastName.expectValue("");
        expect(await this.createAccountLogin.isChecked()).toBe(false);
        await expect(this.cancelButton).toBeEnabled();
        await expect(this.saveButton).toBeEnabled();
    }

    async expectFirstNameRequiredError() {
        await this.userForm.firstName.expectErrorMessage(ERROR_MSG.REQUIRE);
    }
    async expectLastNameRequiredError() {
        await this.userForm.lastName.expectErrorMessage(ERROR_MSG.REQUIRE);
    }
    async expectErrorExistId() {
        await this.userForm.employeeId.expectErrorMessage("Employee Id " + ERROR_MSG.EXIST);
    }


}