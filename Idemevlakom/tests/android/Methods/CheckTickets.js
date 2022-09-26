import Swipe from "./Swipe"
import AddPassenger from "./AddPassenger"
import HomeScreen from "./HomeScreen"
import { isTicketClass, isTicketReservation } from "./Reservations_Methods"
import Assertions, { TrainToInSegment } from "./Assertions"
import { trainDataArayMock, trainDataArrayMock } from "../Data/trainDataArrayMock"
import BasicFunction from "./BasicFunction"

export let checkTrainDate
export let checkTrainTime
export let currentItemTimeDate
export let currentItemTimeDate2
export let currentItemTimeDate3
export let indexOfDates
export let passengerItemName
export let secondTrainColumn
export let trainDataArray = []
export let isEmptyTrainDataArray = true
export let firstIdIntrainDataArray = 1
export let ticketIdarray = []
export let ticketIdTmp
export let numberOfSwipes
export let timeDepartureInTicket
export let trainFromTmp
export let trainToTmp
export let trainDataCheck = {}
export let checkTrainDateTratovySelector
export let checkTrainDateTratovySplit
export let checkTrainDateValidity
export let validityTime
export let numberOfItems
export let index = 1


class CheckTickets {

    get ticketItemTimeDate() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_tickets_ticket_from_date"]')
    }
    get showTickets() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_route_passengers_show_valid_tickets"]')
    }
    get trainFromTratovy() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_order_line_item_from"]')
    }
    get trainToTratovy() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_order_line_item_to"]')
    }
    /* get passengerItemName() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_route_passengers_item_name"]').getText()
    } */
    get ticketBtn() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_route_appbar_tickets_btn"]')
    }
    get ticketValidityFrom() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_ticket_validity_from"]')
    }
    get ticketValidityTo() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_ticket_validity_to"]')
    }
    get ticketId() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_tickets_ticket_id"]')
    }
    get nameInTicket() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_tickets_ticket_name"]')
    }


    async ChecktrainTimeDate(userData) {
        await this.ChecktrainTimeDateOnly(userData)
        await this.PushDataToTrainDataArray(userData)
    }

    async PushDataToTrainDataArray(userData) {
        //Vytvorenie objektu s dátami z obrazovky
        trainDataCheck = {}
        trainDataCheck.id = firstIdIntrainDataArray
        trainDataCheck.name = userData.name
        trainDataCheck.lastName = userData.lastname
        trainDataCheck.trainFrom = trainFromTmp
        trainDataCheck.trainTo = trainToTmp
        trainDataCheck.trainTimeDeparture = (await checkTrainTime + ", " + await checkTrainDate)

        //push dát z obrazovky do poľa
        trainDataArray.push(trainDataCheck)

        expect(await userData.from).toEqual(trainDataCheck.trainFrom)
        expect(await userData.to).toEqual(trainDataCheck.trainTo)

        isEmptyTrainDataArray = false
        firstIdIntrainDataArray += 1
    }

    async ChecktrainTimeDateOnly(userData) {

        //Kontrola dát Z a Do(Aj ak je viac segmentov)
        while (!await $('//*[contains (@text, "Spojeni")]').isDisplayed()) {
            Swipe.swipeDown()
        }

        await Assertions.CheckTrainFromInAddPassenger(userData)

        //Elementy dátum a čas
        checkTrainDate = await $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_order_trains_item_from_date"]').getText()
        checkTrainTime = await $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_order_trains_item_from_time_original"]').getText()

        trainFromTmp = await AddPassenger.FromResult.getText()
        trainToTmp = await TrainToInSegment.getText()

        //Assertion - porovnanie dát z obrazovky s dátami užívateľa
        expect(await AddPassenger.FromResult.getText()).toEqual(userData.from)
        expect(await TrainToInSegment.getText()).toEqual(userData.to)
    }

    async RemoveLastChecktrainTimeData() {
        await trainDataArray.pop()
    }


    //Kontrola dát konkrétneho lístka v sekcii "Aktuálne cesty"
    async CheckTicket(userData, trainData) {
        let j = 0
        for (let i of trainData) {

            //Vyhľadanie konkrétneho lístka v Aktuálne cesty
            await this.findTicketResult(userData, j, i)

            //Otvorenie dokladu a kontrola času a dátumu na cestovnom lístku
            while (!await this.showTickets.isDisplayed()) {
                await Swipe.swipeUpMin()
            }

            // Klik na Otvoriť doklady a kontrola mena a času
            await this.showTickets.click()
            await this.nameInTicket.waitForDisplayed()

            ///////////////////////////////////////////TO DO To Do to do //////////////////////////////
            if (await userData[j].isTratovy) {
                timeDepartureInTicket = await BasicFunction.removeZeroFromStart(await this.ticketValidityFrom.getText()) + " - " + await this.ticketValidityTo.getText()
            }
            else {
                timeDepartureInTicket = await BasicFunction.removeZeroFromStart(await this.ticketItemTimeDate.getText())
            }
            console.log(timeDepartureInTicket);
            ticketIdTmp = ""
            while ((await timeDepartureInTicket !== await i.trainTimeDeparture) || (await this.nameInTicket.getText() !== (await i.name + " " + await i.lastName))) {


                console.log(await this.ticketItemTimeDate.getText());
                console.log(timeDepartureInTicket);
                console.log(await i.trainTimeDeparture);

                if (await this.ticketId.getText() == ticketIdTmp) {
                    return
                }

                ticketIdTmp = await this.ticketId.getText()
                await Swipe.swipeToLeft()
                await browser.pause(500)
                console.log(await this.ticketId.getText());
                console.log(ticketIdTmp);
                timeDepartureInTicket = await BasicFunction.removeZeroFromStart(await this.ticketItemTimeDate.getText())
            }


            expect(await this.nameInTicket.getText()).toEqual(i.name + " " + i.lastName)
            expect(await timeDepartureInTicket).toContain(await i.trainTimeDeparture)
            console.log(await this.nameInTicket.getText() + " = " + i.name + " " + i.lastName);
            console.log(await timeDepartureInTicket + " = " + await i.trainTimeDeparture);

            await browser.saveScreenshot("./Idemevlakom/tests/android/testcases/Screenshots/" + i.trainFrom + " - " + i.trainTo + ": " + i.name + " " + i.lastName + ".png")
            j += 1
            await HomeScreen.navigateUp.click()
            /////////RETURN
            //await this.CheckName(i)
            await HomeScreen.navigateUp.click()
            for (let k = 0; k <= numberOfSwipes; k++) {
                await Swipe.swipeDown()
            }
        }
    }

    //Vyhľadanie konkrétneho lístka v Aktuálne cesty
    async findTicketResult(userData, j, i) {

        numberOfSwipes = 0
        while (!await this.ticketItemTimeDate.isDisplayed()) {
            currentItemTimeDate = await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.TextView[1]')
            await Swipe.swipeElement0nTopActualWay(await currentItemTimeDate)

             let counter = await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[' + index + ']/android.view.ViewGroup/android.widget.TextView[1]')
            let numberOfItems = 0
            while(await counter.isDisplayed()){  
                index += 1
                numberOfItems +=1
                counter = await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[' + index + ']/android.view.ViewGroup/android.widget.TextView[1]')
            } 
            

            for (indexOfDates = 1; indexOfDates < 5; indexOfDates++) {
                currentItemTimeDate = await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[' + indexOfDates + ']/android.view.ViewGroup/android.widget.TextView[1]')
                //await Swipe.swipeElement0nTopActualWay(await currentItemTimeDate)

                while (!await currentItemTimeDate.isDisplayed()) {
                    currentItemTimeDate2 = await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[' + (indexOfDates + 1) + ']/android.view.ViewGroup/android.widget.TextView[1]')
                    await Swipe.swipeElement0nTop(await currentItemTimeDate)
                }

                //Ak je 0 na začiatku reťazca(rozdielny čas v aktualnych cestách)
                let currentItemTimeDateString = await currentItemTimeDate.getText()
                currentItemTimeDateString = await BasicFunction.removeZeroFromStart(currentItemTimeDateString)
                console.log(await currentItemTimeDateString);

                while (!await currentItemTimeDate.isDisplayed()) {
                    Swipe.swipeUpMin()
                }

                if (await currentItemTimeDateString == (await i.trainTimeDeparture)) {
                    //Kontrola času a dátumu v "Aktuálne cesty" a otvorenie aktuálnej cesty
                    expect(await currentItemTimeDate.getText()).toContain((await i.trainTimeDeparture))
                    await currentItemTimeDate.click()

                    //Kontrola Mena a priezviska v Aktuálnych cestách
                    await this.CheckName(i)

                    if (await passengerItemName == (i.name + " " + i.lastName)) {
                        console.log("------------------------- " + await passengerItemName);

                        expect(await passengerItemName).toEqual(await userData[j].name + " " + await userData[j].lastname)
                        console.log("------------- " + await userData[j].name + " " + await userData[j].lastname);
                        return
                    }
                }
            console.log(await currentItemTimeDate.getText());

            }
            console.log(indexOfDates);
            console.log(await currentItemTimeDate.getText());

            await Swipe.swipeElement0nTopActualWay(await currentItemTimeDate)
            numberOfSwipes += 1
            index = 1
        }
    }

    //Kontrola Mena a priezviska v Aktuálnych cestách
    async CheckName(i) {
        while (!await $('//*[@text="Cestujúci"]').isDisplayed()) {
            await Swipe.swipeUp()
        }
        if (!await $('//*[@text="Zobraziť doklady"]').isDisplayed()) {
            await Swipe.swipeElement0nTop(await $('//*[@text="Cestujúci"]'))
        }
        if (!await $('//*[@text="' + i.name + " " + i.lastName + '"]').isDisplayed()) {
            await HomeScreen.navigateUp.click()
            indexOfDates += 1
            return
        }
        passengerItemName = await $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_route_passengers_item_name" and contains (@text, "' + i.name + " " + i.lastName + '")]').getText()

        if (await passengerItemName !== (i.name + " " + i.lastName)) {
            await HomeScreen.navigateUp.click()
            return
        }
        expect(await passengerItemName).toContain(await i.name + " " + i.lastName)


    }

    async ChecktrainTimeDateTratovy(userData) {
        await this.ChecktrainTimeDateTratovyOnly(userData)
        await this.PushDataToTrainDataArrayTratovy(userData)

        
    }

    async ChecktrainTimeDateTratovyOnly(userData){
        expect(await this.trainFromTratovy.getText()).toEqual(userData.from)
        expect(await this.trainToTratovy.getText()).toEqual(userData.to)

        checkTrainDateTratovySelector = await $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_appbar_date"]').getText()
        
        if(await userData.validity == "Mesačný"){
            validityTime = 29
        }
        else{
            validityTime = 6
        }
        checkTrainDateValidity = await BasicFunction.date(checkTrainDateTratovySelector.split(" ")[1], validityTime) + " 24:00"

        console.log(checkTrainDateValidity);
        
        
        
        
        // -------------- TO DO ------------------------
       





    }

    async PushDataToTrainDataArrayTratovy(userData){
        //Vytvorenie objektu s dátami z obrazovky
        trainDataCheck = {}
        trainDataCheck.id = firstIdIntrainDataArray
        trainDataCheck.name = userData.name
        trainDataCheck.lastName = userData.lastname
        trainDataCheck.trainFrom = await this.trainFromTratovy.getText()
        trainDataCheck.trainTo = await this.trainToTratovy.getText()
        trainDataCheck.trainTimeDeparture = await checkTrainDateValidity

        //push dát z obrazovky do poľa
        trainDataArray.push(trainDataCheck)

        expect(await userData.from).toEqual(trainDataCheck.trainFrom)
        expect(await userData.to).toEqual(trainDataCheck.trainTo)

        isEmptyTrainDataArray = false
        firstIdIntrainDataArray += 1
    }

}



export default new CheckTickets()