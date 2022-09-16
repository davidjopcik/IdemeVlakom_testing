import { trainDataArray } from "./CheckTickets"
import HomeScreen from "./HomeScreen"
import Reservations, { numberOfSegments } from "./Reservations"
import SearchResult from "./SearchResult"
import Swipe from "./Swipe"

export let MCDTypeNameSelector = ""
export let ticketClassSelector = ""
export let ticketReservationSelector = ""
export let serviceReservationSelector = ""
export let isTicketClass = false
export let isTicketReservation = false

class ReservationsMethods {


    get SelectMCDTicketSelector() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_base_order_segment_group_pricing_item_title"]')
    }
    get MCDTypeSelector() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_base_order_segment_group_pricing_item_pricing_product_type"]')
    }
    get MCDTypeBtnSelector() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_base_order_segment_group_pricing_item_select_pricing_type_button"]')
    }
    

        ///////////FUNCTIONS & METHODS///////////////

    //Výber MCD typu lístka
    async selectMCD(MCDType){

        if ((MCDType !== ("" || undefined)) && (await this.MCDTypeBtnSelector.isDisplayed())) {
            if (await this.MCDTypeSelector.getText() !== MCDType) {
                await this.MCDTypeBtnSelector.click()
                expect($('//*[@text="Vyberte si ponuku"]')).toBeDisplayed()
                MCDTypeNameSelector = await $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_pricing_product_type_item_pricing_product_type"and (@text="' + MCDType + '")]')
                await MCDTypeNameSelector.click()
                expect(await this.MCDTypeSelector.getText()).toEqual(MCDType)
            }
        }
    }

    //Výber triedy a miestenky
    async selectClassAndReservation(ticketClass, ticketReservation, serviceReservation){
        if (ticketReservation == "" || ticketReservation == undefined) {
            return
        }

        ticketClassSelector = await $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_pricing_segment_class_item_radioButton" and contains (@text, "' + ticketClass + '")]')
        ticketReservationSelector = await $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_pricing_segment_reservation_item_radio_button" and (@text="' + ticketReservation + '")]')
        if (serviceReservation !== ("" || undefined)) {
            serviceReservationSelector = await $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_pricing_segment_service_reservation_item_radio_button" and contains (@text, "' + serviceReservation + '")]')
        }
        //Výber triedy a miestenky na jednom segmente
        let m = 0
        while (m < numberOfSegments) {
            while (!await $('//*[@text="Úsek"]').isDisplayed()) {
                await Swipe.swipeUpMin()
            }
            await Swipe.swipeElement0nTop(await $('//*[@text="Úsek"]'))
            ticketClassSelector = await $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_pricing_segment_class_item_radioButton" and contains (@text, "' + ticketClass + '")]')
            ticketReservationSelector = await $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_pricing_segment_reservation_item_radio_button" and (@text="' + ticketReservation + '")]')

            if (await ticketClassSelector.isExisting()) {
                console.log("--------------- " + await ticketClassSelector.getText());

                await ticketClassSelector.click()
                isTicketClass = true
                if (await ticketReservationSelector.isDisplayed()) {
                    console.log("--------------- " + await ticketReservationSelector.getText());
                    await ticketReservationSelector.click()
                    isTicketReservation = true
                }
            }
            m += 1
        }
    }

    async classAndReservationIsNot(){
        //Ak nie je trieda v ponuke
        if (!isTicketClass || !isTicketReservation) {
            if (!await ticketClassSelector.isDisplayed()) {
                await HomeScreen.navigateUp.click();
                await HomeScreen.navigateUp.click();
                await Swipe.swipeUp()
                if (await SearchResult.loadNext.isDisplayed()) {
                    await SearchResult.loadNext.click()
                    await Swipe.swipeUp()
                }
                await trainDataArray.pop()
                console.log(trainDataArray);
                return
            }
            await ticketClassSelector.click()

            // Ak nie je miestenka v ponuke
            if (!await ticketReservationSelector.isDisplayed()) {
                await Swipe.swipeUpAllScreen()
                if (await ticketReservationSelector.isDisplayed()) {
                    return isTicketClass
                }
                await HomeScreen.navigateUp.click();
                await HomeScreen.navigateUp.click();
                await Swipe.swipeUp()
                if (await SearchResult.loadNext.isDisplayed()) {
                    await SearchResult.loadNext.click()
                    await Swipe.swipeUp()
                }
                await trainDataArray.pop()
                return 
            }
        }
    }



}

export default new ReservationsMethods()