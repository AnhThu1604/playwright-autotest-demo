import { Status } from "@framework/constants/status";
import { test } from "@framework/fixtures/employeeFixture";
import { generateEmployee } from "@test-data/employee/employeeGenerator";

test.describe("Validate Create Employee Page", () => {
    test.beforeEach(async ({ pages }) => {
        await pages.EmployeeList.openEmployeeListPage();
        await pages.EmployeeList.clickAddButton();
    })


    test("Create Employee without account", async ({ pages }) => {
        const employee = generateEmployee();
        await pages.createEmployee.createEmployee(employee, false);
        await pages.createEmployee.page.waitForURL(/viewPersonalDetails/);
    })

    test.describe("Create Employee have account", () => {
        [Status.Disable, Status.Enable].forEach(status => {
            test(`Create Employee have account with status = ${status}`, async ({ pages }) => {
                const employee = generateEmployee();
                employee.user.status = status;
                await pages.createEmployee.createEmployee(employee, true);
                await pages.createEmployee.page.waitForURL(/viewPersonalDetails/);
            });
        })
    })

})