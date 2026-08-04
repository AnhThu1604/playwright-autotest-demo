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

    test("Create Employee with exist id", async ({ pages }) => {
        const employee = generateEmployee();
        await test.step("Create a employee", async () => {
            await pages.createEmployee.createEmployee(employee, false);
            await pages.createEmployee.page.waitForURL(/viewPersonalDetails/);
        });
        await test.step("Create employee exist id", async () => {
            await pages.EmployeeList.openEmployeeListPage();
            await pages.EmployeeList.clickAddButton();
            await pages.createEmployee.fillCreateUser(employee, false);
            await pages.createEmployee.expectErrorExistId();
        });
    })


})