import OpenApp from "./OpenApp"
import Reservations from "./Reservations";

class FailErrors {
    get badRequestPaymentGateway(){
        return $('//*[contains(@text, "Bad request")]')
    }

    async restarteAppError(){
        if(await this.badRequestPaymentGateway.isDisplayed()){
            console.log("-------------------- Bad Request");
            await OpenApp.restarteApp()
            
        }
    }

    async nextBtn1_3_Err(from, to){
        if((await Reservations.errMsgPriceCount.isDisplayed()) || (await Reservations.errMsgPriceTrain.isDisplayed())){
            await browser.saveScreenshot('./Idemevlakom/tests/android/testcases/Error_screenshots/train' + from + ' - ' + to + ".png")
        }
    }

}

export default new FailErrors()