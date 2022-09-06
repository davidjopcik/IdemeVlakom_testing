import { getCapabilities } from "@wdio/cli/build/utils"
import Alerts from "./Alerts"
import HomeScreen from "./HomeScreen"

class Payment {
    get payByCartIconSelector() {
        return $('//*[@text="Platba kartou"]')
    }
    get payByGooglePayIconSelector() {
        return $('//*[@text="Google Pay"]')
    }
    get toPayBottomSelector() {
        return $('//*[@text="ZAPLATIŤ"]')
    }
    get cardNumberInputSelector() {
        return $('//*[@resource-id="inputPan"]')
    }
    get cardValidMonthSelector() {
        return $('//*[@resource-id="inputExpiryMonth"]')
    }
    get cardValidYearSelector() {
        return $('//*[@resource-id="inputExpiryYear"]')
    }
    get sendPaySelector() {
        return $('//*[@resource-id="send"]')
    }
    get paymentFinishedSelector() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/d_button_ok"]')
    }
    get paymentGateRealDeviceScreen(){
        return $('//*[@class="android.widget.FrameLayout"]')
    }


    async payByCart(numberOfCard, expiryMonth, expiryYear) {
        await this.toPayBottomSelector.waitForDisplayed()
        await this.toPayBottomSelector.click()
        
        //Ak  je lístok expirovaný alebo vypršala ponuka
        while(!await this.payByCartIconSelector.isDisplayed()){
            await Alerts.deleteExpiredTickets()
        }
        
        await this.payByCartIconSelector.waitForDisplayed()
        await this.toPayBottomSelector.click()
        await browser.pause(5000) 
        if (driver.capabilities.deviceName == "ce12160caa56e0430c") {
            await this.paymentGateRealDeviceScreen.waitForDisplayed({timeout: 60000})
            await this.payByCartRealDevice()
        }
        else {
            await this.cardNumberInputSelector.waitForDisplayed({ timeout: 120000 })
            await this.cardNumberInputSelector.addValue(numberOfCard)
            await this.cardValidMonthSelector.addValue(expiryMonth)
            await this.cardValidYearSelector.addValue(expiryYear)
            await this.sendPaySelector.click()
        }

        await this.paymentFinishedSelector.waitForDisplayed({ timeout: 60000 })
        await this.paymentFinishedSelector.click()
        await HomeScreen.navPanel.click()
        await HomeScreen.DrawerTicketCurrent.click()

    }



    async payByCartRealDevice() {
        browser.touchPerform([{
            action: 'tap',
            options: {
                x: 350,
                y: 780
            }
        }]);

        await this.cardNumberInputFillonRealDevice()
        await this.cardValidMonthInputFill()
        await this.cardValidYearInputFill()
        await browser.hideKeyboard()
        await this.toPayBottonTap()
    }

    async cardNumberInputFillonRealDevice() {
        await browser.pause(2000)
        await driver.pressKeyCode(11)  //4
        await browser.pause(500)
        await driver.pressKeyCode(7)    //0
        await browser.pause(500)
        await driver.pressKeyCode(12)   //5
        await browser.pause(500)
        await driver.pressKeyCode(13)   //6
        await browser.pause(500)
        await driver.pressKeyCode(7)   //0
        await browser.pause(500)
        await driver.pressKeyCode(14)   //7
        await browser.pause(500)
        await driver.pressKeyCode(7)   //0
        await browser.pause(500)
        await driver.pressKeyCode(7)   //0
        await browser.pause(500)
        await driver.pressKeyCode(7)   //0
        await browser.pause(500)
        await driver.pressKeyCode(7)   //0
        await browser.pause(500)
        await driver.pressKeyCode(7)   //0
        await browser.pause(500)
        await driver.pressKeyCode(7)   //0
        await browser.pause(500)
        await driver.pressKeyCode(7)   //0
        await browser.pause(500)
        await driver.pressKeyCode(7)   //0
        await browser.pause(500)
        await driver.pressKeyCode(8)   //1
        await browser.pause(500)
        await driver.pressKeyCode(13)   //6
        await browser.pause(500)
    }

    async cardValidMonthInputFill() {
        await browser.pause(500)
        browser.touchPerform([{
            action: 'tap',
            options: {
                x: 190,
                y: 930
            }
        }]);

        await browser.pause(500)
        await driver.pressKeyCode(8)  //1
        await browser.pause(500)
        await driver.pressKeyCode(9)  //2
    }

    async cardValidYearInputFill() {
        await browser.pause(500)
        browser.touchPerform([{
            action: 'tap',
            options: {
                x: 510,
                y: 930
            }
        }]);
        await browser.pause(500)
        await driver.pressKeyCode(9)  //2
        await browser.pause(500)
        await driver.pressKeyCode(10)  //3
    }

    async toPayBottonTap() {
        await browser.pause(1000)
        browser.touchPerform([{
            action: 'tap',
            options: {
                x: 550,
                y: 1220
            }
        }]);
    }



}
export default new Payment()