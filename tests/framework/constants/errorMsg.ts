import { Length } from "./length";

export const ERROR_MSG = {
    REQUIRE: "Required",
    EXIST: "already exists",
    MIN_LENGTH_USERNAME: `Should be at least ${Length.username.min} characters`,
    MAX_LENGTH_USERNAME: `Should not exceed ${Length.username.max} characters`,
    MIN_LENGTH_PASSWORD: `Should have at least ${Length.password.min} characters`,
    MAX_LENGTH_PASSWORD: `Should not exceed ${Length.password.max} characters`,
    CONTAIN_LOWER_CASE_PASSWORD: `Your password must contain minimum 1 lower-case letter`,
    // CONTAIN_UPPER_CASE_PASSWORD: "Your password must contain minimum 1 upper-case letter",
    CONTAIN_NUMBER_PASSWORD: `Your password must contain minimum 1 number`,
    CONFIRM_PASSWORD_NOT_MATCH: `Passwords do not match`

}