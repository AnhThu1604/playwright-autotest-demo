import { Locator } from "@playwright/test";

export class Checkbox {
    readonly locator: Locator;
    readonly errorMsg: Locator;

    constructor(locator: Locator, errorMsg: Locator) {
        this.locator = locator;
        this.errorMsg = errorMsg;
    }

    async fill(value: boolean) {
        if(value){
            await this.locator.check();
        } else {
            await this.locator.uncheck();
        }
    }
    async check(){
        await this.locator.check();
    }
    async uncheck(){
        await this.locator.uncheck();
    }
}