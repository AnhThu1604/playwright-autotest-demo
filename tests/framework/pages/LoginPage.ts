import { Page, Locator, expect } from "@playwright/test";
import { TextField } from "@framework/components/TextField";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.URL;
export class LoginPage {
    readonly page: Page;
    readonly username: TextField;
    readonly password: TextField;
    readonly loginButton: Locator;
    readonly alert: Locator;

    constructor(page: Page) {
        this.page = page;
        // Tìm div chứa cả label Username và ô input tương ứng
        this.username = new TextField(
            page.locator(".oxd-input-group").filter({ hasText: "Username" })
        );
        // Tìm div chứa cả label Password và ô input tương ứng
        this.password = new TextField(
            page.locator(".oxd-input-group").filter({ hasText: "Password" })
        );
        this.loginButton = page.getByRole("button", { name: "Login" });
        this.alert = page.getByRole("alert");
    }

    async open() {
        await this.page.goto(URL!);
        // Expect a title "to contain" a substring.
        await expect(this.page).toHaveTitle("OrangeHRM");
    }

    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async validateUsernameError(expectedMessage: string) {
        await this.username.expectErrorMessage(expectedMessage);
    }

    async validatePasswordError(expectedMessage: string) {
        await this.password.expectErrorMessage(expectedMessage);
    }

    async validateAlert(expectedAlert: string) {
        await expect(this.alert).toHaveText(expectedAlert);
    }
}