const { default: OpenApp } = require("../../Methods/OpenApp");
const { default: Search } = require("../../Methods/Search");

describe('test', () => {
    it('open app', async () => {
        await OpenApp.restarteApp()
    });

    it('Vyhľadanie spojenie', async () => {
        await Search.searchFrom.waitForDisplayed({ timeout: 15000 })
        await Search.searchFrom.click()


        if (driver.capabilities.deviceName == "ce12160caa56e0430c") {
            console.log("------------------------------- ANDROID ");
        }
        else{
            console.log("------------------------------- EMULATOR ")
        }
        
    });


});