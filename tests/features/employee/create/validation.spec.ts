import { faker } from "@faker-js/faker";
import { Length } from "@framework/constants/length";
import { test } from "@framework/fixtures/employeeFixture";
import { generateEmployee } from "@test-data/employee/employeeGenerator";

test.describe("Validate Create Employee Page", () => {
    test.beforeEach(async ({ pages }) => {
        await pages.EmployeeList.openEmployeeListPage();
        await pages.EmployeeList.clickAddButton();
    })

    test("Check default form", async ({ pages }) => {
        await pages.createEmployee.expectDefaulValueForm();
    })
    test.describe("Validate employee info", () => {
        test("Create Employee with First name = null", async ({ pages }) => {
            const employee = generateEmployee();
            console.log(employee);
            employee.firstName = " ";
            await pages.createEmployee.fillCreateUser(employee, false)
            await pages.createEmployee.expectFirstNameRequiredError();
        })

        test("Create Employee with Last name = null", async ({ pages }) => {
            const employee = generateEmployee();
            employee.lastName = " ";
            await pages.createEmployee.fillCreateUser(employee, false)
            await pages.createEmployee.expectLastNameRequiredError();
        })
    })


    test.describe("Validate with login account", () => {
        test("Create Employee with username = null", async ({ pages }) => {
            const employee = generateEmployee();
            employee.user.username = " ";
            await pages.createEmployee.fillCreateUser(employee, true);
            await pages.createEmployee.expectUsernameRequiredError();
        })
        test.describe("Validate min length of username", () => {
            const employee = generateEmployee();
            test("Check fill username has less than min length", async ({ pages }) => {
                employee.user.username = faker.string.alphanumeric(Length.username.min - 1);
                await pages.createEmployee.fillCreateUser(employee, true);
                await pages.createEmployee.expectUsernameMinLengthError();
            })
            test("Check fill username has min length", async ({ pages }) => {
                employee.user.username = faker.string.alphanumeric(Length.username.min);
                await pages.createEmployee.createEmployee(employee, true);
            })
        })
        test.describe("Validate max length of username", () => {
            const employee = generateEmployee();
            test("Check fill username has more than max length", async ({ pages }) => {
                employee.user.username = faker.string.alphanumeric(Length.username.max + 1);
                await pages.createEmployee.fillCreateUser(employee, true);
                await pages.createEmployee.expectUsernameMaxLengthError();
            })
            test("Check fill username has max length", async ({ pages }) => {
                employee.user.username = faker.string.alphanumeric(Length.username.max);
                await pages.createEmployee.createEmployee(employee, true);
            })
        })
        test("Create Account has exit username", async ({ pages }) => {
            const employee = generateEmployee();
            await test.step("Create user first time", async () => {
                await pages.createEmployee.createEmployee(employee, true);
            })
            await test.step("Create user second time", async () => {
                await pages.EmployeeList.clickAddEmployeeButton();
                await pages.createEmployee.fillCreateUser(employee, true);
                await pages.createEmployee.expectErrorExistId();
            })
        })
        test("Create Employee with password = null", async ({ pages }) => {
            const employee = generateEmployee();
            employee.user.password = " ";
            employee.user.confirmPassword = employee.user.password;
            await pages.createEmployee.fillCreateUser(employee, true);
            await pages.createEmployee.expectPasswordRequiredError();
        })
        test.describe("Validate min length of password", () => {
            const employee = generateEmployee();
            test("Check fill password has less than min length", async ({ pages }) => {
                employee.user.password = "a".repeat(Length.password.min - 1);
                await pages.createEmployee.fillCreateUser(employee, true);
                await pages.createEmployee.expectPasswordMinLengthError();
            })
            test("Check fill password has min length", async ({ pages }) => {
                employee.user.password = "1" + "a".repeat(Length.password.min - 1);
                await pages.createEmployee.createEmployee(employee, true);
            })
        })
        test.describe("Validate max length of password", () => {
            const employee = generateEmployee();
            test("Check fill password has more than max length", async ({ pages }) => {
                employee.user.password = "a".repeat(Length.password.max + 1);
                await pages.createEmployee.fillCreateUser(employee, true);
                await pages.createEmployee.expectPasswordMaxLengthError();
            })
            test("Check fill password has max length", async ({ pages }) => {
                employee.user.password = "1" + "a".repeat(Length.password.max - 1);
                await pages.createEmployee.createEmployee(employee, true);
            })
        })
        test.describe("Validate password must contain lower case", () => {
            const employee = generateEmployee();
            test("Check fill password has only number", async ({ pages }) => {
                employee.user.password = "1111111111";
                await pages.createEmployee.fillCreateUser(employee, true);
                await pages.createEmployee.expectPasswordLowerCaseError();
            })
            test("Check fill password has only upper case", async ({ pages }) => {
                employee.user.password = "AAAAAAA";
                await pages.createEmployee.fillCreateUser(employee, true);
                await pages.createEmployee.expectPasswordLowerCaseError();
            })
            test("Check fill password has 1 lower case", async ({ pages }) => {
                employee.user.password = "a1111111111";
                await pages.createEmployee.createEmployee(employee, true);
            })
        })
        test.describe("Validate password must contain number", () => {
            const employee = generateEmployee();
            test("Check fill password has only lower case", async ({ pages }) => {
                employee.user.password = "aaaaaaa";
                await pages.createEmployee.fillCreateUser(employee, true);
                await pages.createEmployee.expectPasswordNumberError();
            })
            test("Check fill password has 1 number", async ({ pages }) => {
                employee.user.password = "Aaaaaa1";
                await pages.createEmployee.createEmployee(employee, true);
            })
        })
    })

    test.describe("Validate Confirm Password", () => {
        test("Confirm password must be same as password", async ({ pages }) => {
            const employee = generateEmployee();
            await test.step("Check fill password and confirm password", async () => {
                employee.user.confirmPassword = faker.string.alphanumeric(8);
                await pages.createEmployee.fillCreateUser(employee, true);
                await pages.createEmployee.expectConfirmPasswordError();
            })
        })
    })

})