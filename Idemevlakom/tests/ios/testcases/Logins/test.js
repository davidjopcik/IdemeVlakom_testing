import { default as HomeScreenIOS } from "../../Methods/HomeScreenIOS";
import { default as OpenAppIOS } from "../../Methods/OpenAppIOS";

describe('Test', () => {
    
    it('Test1',async () => {
        await OpenAppIOS.restarteApp()
        await HomeScreenIOS.navPanel.click()
        //const text = '**/XCUIElementTypeStaticText[`label CONTAINS "@gmail.com"`]'

        await $("-ios class chain:**/XCUIElementTypeStaticText[`label CONTAINS '@gmail.com'`]").waitForDisplayed()
        await $("-ios class chain:**/XCUIElementTypeStaticText[`label CONTAINS '@gmail.com'`]").click()
       

        /* await $(`-ios class chain:${text}`).waitForDisplayed()
        await $(`-ios class chain:${text}`).click() */

    });
});