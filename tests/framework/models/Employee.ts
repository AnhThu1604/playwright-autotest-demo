import { Status } from "@framework/constants/status";

export interface Employee {
     firstName: string,
     middleName: string,
     lastName: string,
     employeeId: string,
     user: {
          username: string,
          password: string,
          status: Status,
          confirmPassword: string
     }

}