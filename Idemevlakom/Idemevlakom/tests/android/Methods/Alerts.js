import Payment from "./Payment"
import Swipe from "./Swipe"

class Alert{
    get alertTicketExpired(){
        return $('//*[@resource-id="android:id/message" and  contains (@text, "V nákupnom košíku sa nachádzajú cesty, ktoré už nie je možné zakúpiť.")]')
    }
    get okButton(){
        return $('//*[@resource-id="android:id/button1" and  contains (@text, "OK")]')
    }
    get ticketExpiredText(){
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_shopping_cart_route_item_route_availability_text" and  contains (@text, "Cestu už nie je možné zakúpiť")]')
    }
    get ticketOfferExpiredText(){
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_shopping_cart_route_item_route_availability_text" and  contains (@text, "Platnosť ponuky vypršala")]')
    }
    get removeExpiredTickedCrossBtn(){
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_shopping_cart_route_item_route_remove_route"]')
    }

    async deleteExpiredTickets(){
        if(await this.alertTicketExpired.isDisplayed()){
            await this.okButton.click()
        }
        await Swipe.swipeDown()
        while(!(await this.ticketExpiredText).isDisplayed() || !(await this.ticketOfferExpiredText).isDisplayed()){
            await Swipe.swipeUpAllScreen()
        }
        await this.removeExpiredTickedCrossBtn.click()
        await Payment.toPayBottomSelector.waitForDisplayed()
        await Payment.toPayBottomSelector.click()


    }


}
export default new Alert()