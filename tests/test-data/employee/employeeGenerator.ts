import { Employee } from "@framework/models/Employee";
import { Status } from "@framework/constants/status";

import { faker } from "@faker-js/faker";


function generateBaseEmployee(): Employee {
    const firstName = faker.person.firstName();
    const middleName = faker.person.middleName();
    const lastName = faker.person.lastName();
    const employeeId = faker.string.numeric(6);
    const username = faker.internet.username({ firstName, lastName });
    const password = faker.internet.password();
    const status = Status.Enable;
    return {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        employeeId: employeeId,
        user: {
            username: username,
            password: password,
            confirmPassword: password,
            status: status
        }
    };
}

export function generateEmployee(
    overrides: Partial<Employee> = {}
): Employee {
    return {
        ...generateBaseEmployee(),
        ...overrides,
    };
}
