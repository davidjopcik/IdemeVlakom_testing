import AddPassenger from "./AddPassenger"
import Assertions from "./Assertions"
import CheckTickets, { trainDataArray } from "./CheckTickets"
import HomeScreen from "./HomeScreen"
import AditionalServices from "./OrderPassengers"
import Reservations_Methods, { isTicketClass, isTicketReservation, ticketClassSelector } from "./Reservations_Methods"
import SearchResult from "./SearchResult"
import Swipe from "./Swipe"

export let SegmentOneFrom = ""
export let SegmentOneTo = ""
export let SegmentTwoFrom = ""
export let SegmentTwoTo = ""
export let SegmentThreeFrom = ""
export let SegmentThreeTo = ""
export let numberOfSegments = 1


class Reservations {

   
    get MCDTypeBtnSelector() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_base_order_segment_group_pricing_item_select_pricing_type_button"]')
    }
    get errMsgPriceCount() {
        return $('//*[@text="Pri pokuse o nacenenie cestovných dokladov nastala chyba."]')
    }
    get errMsgPriceTrain() {
        return $('//*[@text="Cestovné doklady pre zvolenú cestu už nie je možné zakúpiť."]')

    }

    async selectReservation(from, to, ticketReservation, serviceReservation, MCDType) {
        //Wait for text
        while (!await $('//*[@text="' + from + '"]').isDisplayed()) {
            await Swipe.swipeDown()
        }

        //Identifikácia segmentov
        await this.numberOfSegments(to)

        //Vyberte si lístok(Ak je MCD)
        await Reservations_Methods.selectMCD(MCDType)

        //Výber Triedy a miestenky
        await Reservations_Methods.selectClassAndReservation(ticketReservation, serviceReservation)

        //Ak nie je trieda v ponuke
        await Reservations_Methods.classAndReservationIsNot()
        // TODO dorobit aby ak nenajde triedu/rezervaciu/lezadlo, tak expect bolo false
    }

    async numberOfSegments(to) {
        await $('//*[@text="Úsek"]').waitForDisplayed({ timeout: 90000 })
        console.log("------------------------ " + numberOfSegments);



        SegmentOneFrom = await $('android=new UiSelector().className("android.widget.LinearLayout").index(0).childSelector(new UiSelector().resourceId("sk.zssk.mobapp.android.dev:id/a_order_pricing_segment_item_from"))')
        SegmentOneTo = await $('android=new UiSelector().className("android.widget.LinearLayout").index(0).childSelector(new UiSelector().resourceId("sk.zssk.mobapp.android.dev:id/a_order_pricing_segment_item_to"))')
        if (await SegmentOneTo.getText() !== to) {
            SegmentTwoFrom = await $('android=new UiSelector().className("android.widget.LinearLayout").index(1).childSelector(new UiSelector().resourceId("sk.zssk.mobapp.android.dev:id/a_order_pricing_segment_item_from"))')
            if (!await SegmentTwoFrom.isDisplayed()) {
                await Swipe.swipeUpAllScreen()
            }
            SegmentTwoTo = await $('android=new UiSelector().className("android.widget.LinearLayout").index(1).childSelector(new UiSelector().resourceId("sk.zssk.mobapp.android.dev:id/a_order_pricing_segment_item_to"))')

            if (await SegmentTwoTo.getText() !== to) {
                await Swipe.swipeUpAllScreen()
                SegmentThreeFrom = await $('android=new UiSelector().className("android.widget.LinearLayout").index(2).childSelector(new UiSelector().resourceId("sk.zssk.mobapp.android.dev:id/a_order_pricing_segment_item_from"))')
                SegmentThreeTo = await $('android=new UiSelector().className("android.widget.LinearLayout").index(2).childSelector(new UiSelector().resourceId("sk.zssk.mobapp.android.dev:id/a_order_pricing_segment_item_to"))')

                if (!await SegmentThreeTo.isDisplayed()) {
                    while (!await SegmentThreeTo.isDisplayed()) {
                        Swipe.swipeUpAllScreen()
                    }
                }

                if (await SegmentThreeTo.getText() !== to) {
                    console.log("---------------------" + SegmentThreeTo);
                    while (!await $('//*[@text="' + to + '"]').isDisplayed()) {
                        Swipe.swipeUpAllScreen()
                    }
                    expect(await $('//*[@text="' + to + '"]')).toBeDisplayed()
                    console.log("------------------------" + numberOfSegments);
                    numberOfSegments = 4
                    console.log("------------------------" + numberOfSegments);
                }
                else {
                    expect(await SegmentThreeTo.getText()).toEqual(to)
                    console.log("------------------------" + numberOfSegments);
                    numberOfSegments = 3
                    console.log("------------------------" + numberOfSegments);
                }
            }
            else {
                expect(await SegmentTwoTo.getText()).toEqual(to)
                console.log("------------------------" + numberOfSegments);
                numberOfSegments = 2
                console.log("------------------------" + numberOfSegments);
            }
        }
        else {

            expect(await SegmentOneTo.getText()).toEqual(to)
            console.log("------------------------" + numberOfSegments);
        }

        while (!await Reservations_Methods.SelectMCDTicketSelector.isDisplayed()) {
            await Swipe.swipeDown()
        }
        expect(await Reservations_Methods.SelectMCDTicketSelector).toBeDisplayed()

    }

    async selectValidity(validity){
        await $('//*[@text="' + validity + '"]').click()
    }

    async selectWayType(wayType){
        await $('//*[@text="' + wayType + '"]').click()
    }




}
export default new Reservations()

