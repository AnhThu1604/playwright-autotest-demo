import { Page } from "@playwright/test";
import { EmployeeListPage } from "@framework/pages/employee/EmployeeListPage";
import { CreateEmployeePage } from "@framework/pages/employee/CreateEmployeePage";
import { UpdateEmployeePage } from "@framework/pages/employee/UpdateEmployeePage";

export function createEmployeePages(page: Page) {
    return {
        EmployeeList: new EmployeeListPage(page),
        createEmployee: new CreateEmployeePage(page),
        updateEmployee: new UpdateEmployeePage(page),
    };
}

export type EmployeePages = ReturnType<typeof createEmployeePages>;