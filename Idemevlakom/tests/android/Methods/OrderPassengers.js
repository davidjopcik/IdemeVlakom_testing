import AddPassenger from "./AddPassenger"
import FailsErrors from "./FailsErrors"
import Reservations from "./Reservations"
import Swipe from "./Swipe"
import TicketSelection from "./TicketSelection"

class OrderPassenger {
    get addOrder() {
        return $('//*[@class="android.widget.RelativeLayout"][last()]//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_order_passengers_item_services_wrapper"]//*[@text="Pridať doplnkovú službu"]')
    }
    get plusDog() {
        return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.ScrollView/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/androidx.recyclerview.widget.RecyclerView/android.widget.RelativeLayout/android.widget.TableLayout/androidx.recyclerview.widget.RecyclerView/android.widget.TableLayout[1]/android.widget.TableRow/android.widget.LinearLayout/android.widget.ImageButton[2]')
    }
    get plusBaggage() {
        return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.ScrollView/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/androidx.recyclerview.widget.RecyclerView/android.widget.RelativeLayout/android.widget.TableLayout/androidx.recyclerview.widget.RecyclerView/android.widget.TableLayout[2]/android.widget.TableRow/android.widget.LinearLayout/android.widget.ImageButton[2]')
    }
    get plusBike() {
        return $("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.ScrollView/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/androidx.recyclerview.widget.RecyclerView/android.widget.RelativeLayout/android.widget.TableLayout/androidx.recyclerview.widget.RecyclerView/android.widget.TableLayout[3]/android.widget.TableRow/android.widget.LinearLayout/android.widget.ImageButton[2]")
    }
    get preprava_bicykla() {
        return $('//*[@text="Preprava bicykla"]')
    }
    get plusBikeTratovy() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_base_order_passenger_services_number_picker_item_button_plus"]')
    }
    get text_tratovyListokNaTrasu() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_order_line_title" and contains(@text, "Traťový lístok na trasu:")]')
    }
    get serviceOnlyCheckBox(){
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_order_other_services_checkbox"]')
    }
    get serviceProgressBar(){
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_order_passengers_item_service_progressBar"]')
    }
    get serviceIconWrapper(){
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_order_passengers_item_service_icons_wrapper"]')

    }


    async addOrderToPassenger(dog, baggage, bicycle, serviceOnly) {

        await this.addOrderToPassengerwithoutNext(dog, baggage, bicycle, serviceOnly)
        await this.addOrderToPassengerNextStep(dog, baggage, bicycle)
        
    }

    async addOrderToPassengerwithoutNext(dog, baggage, bicycle, serviceOnly){
        if (dog || baggage || bicycle !== undefined) {
            /* while (await this.serviceProgressBar.isDisplayed()) {
                browser.pause
            } */
            await this.addOrder.click()
            if (!await this.text_tratovyListokNaTrasu.isDisplayed()) {

                await Swipe.swipeUp()

                if (dog !== undefined) {
                    await this.addDog(dog)
                }
                if (baggage !== undefined) {
                    await this.addBaggage(baggage)

                }
                if (bicycle !== undefined) {
                    await this.addBike(bicycle)
                }
            }
            else {
                await this.addBikeTratovy(bicycle)
            }
            await this.addOrder.click()
        }

        if(serviceOnly){
            await Swipe.swipeUp()
            await this.serviceOnlyCheckBox.click()
        }
    }

    async addOrderToPassengerNextStep(dog, baggage, bicycle){
        await TicketSelection.nextBtn_1_3.click()
        await TicketSelection.nextBtn_2_3.waitForDisplayed({ timeout: 40000 })
        await FailsErrors.nextBtn1_3_Err()
        

        await this.chceckOrderName(dog, baggage, bicycle)
    }




    async addDog(number_of_dogs) {
        for (let i = 1; i <= number_of_dogs; i++) {
            await this.plusDog.click()
        }
    }
    async addBaggage(number_of_baggages) {
        for (let i = 1; i <= number_of_baggages; i++) {
            await this.plusBaggage.click()
        }
    }
    async addBike(number_of_bikes) {
        for (let i = 1; i <= number_of_bikes; i++) {
            await this.plusBike.click()
        }
    }
    async addBikeTratovy(number_of_bikes) {
            for (let i = 1; i <= number_of_bikes; i++) {
                await this.plusBikeTratovy.click()
            }
    }

    //Assertion
    async chceckOrderName(dog, baggage, bicycle) {
            if (dog !== undefined) {
                await expect($('//*[@text="preprava psa"]')).toBeDisplayed()
            }
            if (baggage !== undefined) {
                await expect($('//*[@text="Preprava batožiny"]')).toBeDisplayed()

            }
            if (bicycle !== undefined) {
                await expect($('//*[@text="Preprava bicykla"]')).toBeDisplayed()

            }


        }
    }

export default new OrderPassenger()