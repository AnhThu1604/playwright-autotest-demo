import { RadioGroup } from "@framework/components/RadioGroup";
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
    readonly status: RadioGroup;
    readonly password: TextField;
    readonly confirmPassword: TextField;
    readonly saveButton: Locator;
    readonly cancelButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.userForm = new EmployeeForm(page);
        this.createAccountLogin = new Switch(page.locator(".oxd-switch-input"));
        this.username = new TextField(page.locator(".oxd-input-group").filter({ hasText: "Username" }));
        this.status = new RadioGroup(page);
        this.password = new TextField(page.locator('.oxd-input-group').filter({ hasText: /^Password/ }));
        this.confirmPassword = new TextField(page.locator('.oxd-input-group').filter({ hasText: "Confirm Password" }));
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
        await this.page.getByText(status).click();
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
    async expectUsernameRequiredError() {
        await this.username.expectErrorMessage(ERROR_MSG.REQUIRE);
    }
    async expectPasswordRequiredError() {
        await this.password.expectErrorMessage(ERROR_MSG.REQUIRE);
    }
    async expectUsernameMinLengthError() {
        await this.username.expectErrorMessage(ERROR_MSG.MIN_LENGTH_USERNAME);
    }
    async expectUsernameMaxLengthError() {
        await this.username.expectErrorMessage(ERROR_MSG.MAX_LENGTH_USERNAME);
    }
    async expectPasswordMinLengthError() {
        await this.password.expectErrorMessage(ERROR_MSG.MIN_LENGTH_PASSWORD);
    }
    async expectPasswordMaxLengthError() {
        await this.password.expectErrorMessage(ERROR_MSG.MAX_LENGTH_PASSWORD);
    }
    async expectPasswordLowerCaseError() {
        await this.password.expectErrorMessage(ERROR_MSG.CONTAIN_LOWER_CASE_PASSWORD);
    }
    async expectPasswordNumberError() {
        await this.password.expectErrorMessage(ERROR_MSG.CONTAIN_NUMBER_PASSWORD);
    }
    async expectConfirmPasswordError() {
        await this.confirmPassword.expectErrorMessage(ERROR_MSG.CONFIRM_PASSWORD_NOT_MATCH);
    }
}