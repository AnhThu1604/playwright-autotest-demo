import { base } from "@playwright/test";
import { CreateEmployeePage } from "@framework/pages/employee/CreateEmployeePage";
import { EmployeeListPage } from "@framework/pages/employee/EmployeeListPage";
import { LoginPage } from "@framework/pages/LoginPage";
import { UpdateEmployeePage } from "@framework/pages/employee/UpdateEmployeePage";


type Fixtures = {
    pages: {
        createEmployee: CreateEmployeePage;
        employeeList: EmployeeListPage;
        employeeUpdate: UpdateEmployeePage;
        login: LoginPage;
    };
};

export const test = base.extend<Fixtures>({
    pages: async ({ page }, use) => {
        await use({
            login: new LoginPage(page),
            createEmployee: new CreateEmployeePage(page),
            employeeList: new EmployeeListPage(page),
            updateEmployee: new UpdateEmployeePage(page),
        });
    },
});