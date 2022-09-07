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
export let checkTrainDateTratovySelector
export let checkTrainDateTratovySplit
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


class CheckTickets {

    get ticketItemTimeDate() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_tickets_ticket_from_date"]')
    }
    get showTickets() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_route_passengers_show_valid_tickets"]')
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
        trainDataCheck.trainFrom =trainFromTmp
        trainDataCheck.trainTo = trainToTmp
        trainDataCheck.trainTimeDeparture = (await checkTrainTime + ", " + await checkTrainDate)

        //push dát z obrazovky do poľa
        trainDataArray.push(trainDataCheck)

        expect(await userData.from).toEqual(trainDataCheck.trainFrom)
        expect(await userData.to).toEqual(trainDataCheck.trainTo)

        isEmptyTrainDataArray = false
        firstIdIntrainDataArray += 1
    }

    async ChecktrainTimeDateOnly(userData){

        //Kontrola dát Z a Do(Aj ak je viac segmentov)
        while (!await $('//*[@text="Spojenie"]').isDisplayed()) {
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
            timeDepartureInTicket = await BasicFunction.removeZeroFromStart(await this.ticketItemTimeDate.getText())
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
                        console.log("------------- " + userData[j].name + " " + await userData[j].lastname);
                        return
                    }
                }
            }
            await Swipe.swipeElement0nTopActualWay(await currentItemTimeDate)
            numberOfSwipes += 1
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
        if(!await $('//*[@text="'+i.name + " " + i.lastName+'"]').isDisplayed()){
            await HomeScreen.navigateUp.click()
            indexOfDates += 1
            return
        }
        passengerItemName = await $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_route_passengers_item_name" and contains (@text, "'+i.name + " " + i.lastName+'")]').getText()
        
        if (await passengerItemName !== (i.name + " " + i.lastName)) {
            await HomeScreen.navigateUp.click()
            return
        }
        expect(await passengerItemName).toContain(await i.name + " " + i.lastName)


    }

    async CheckTrainName() {
        expect(await AddPassenger.FromResult.getText()).toEqual(passenger.from)
        if (!await AddPassenger.secondTrainExist.isExisting()) {
            expect(await AddPassenger.ToResult.getText()).toEqual(passenger.to)
        }
        else {
            expect(await AddPassenger.secondTrainExist.getText()).toEqual(passenger.to)
        }

    }
    async CheckTrainTimeDateNames() {

    }





    async ChecktrainTimeDateTratovy() {
        checkTrainDateTratovySelector = await $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_appbar_date"]').getText()
        checkTrainDateTratovySplit = checkTrainDateTratovySelector.split(" ")[1].concat(" ", "-")
    }

    async findTicketResultTratovy(ticketName, ticketLastName) {

        while (!await this.ticketItemTimeDate.isDisplayed()) {
            for (indexOfDates = 1; indexOfDates < 5; indexOfDates++) {
                currentItemTimeDate = await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[' + indexOfDates + ']/android.view.ViewGroup/android.widget.TextView[1]')

                while (!await currentItemTimeDate.isDisplayed()) {
                    Swipe.swipeUpMin()
                }

                //Ak je 0 na začiatku reťazca(rozdielny čas v aktualnych cestách)
                let currentItemTimeDateString = await currentItemTimeDate.getText()

                if (await currentItemTimeDateString.charAt(0) == "0") {
                    currentItemTimeDateString = currentItemTimeDateString.substring(1)
                }

                while (!await currentItemTimeDate.isDisplayed()) {
                    Swipe.swipeUpMin()
                }
                //

                let currentItemTimeDateStringSplit = currentItemTimeDateString.split(" ")[0].concat(" ", currentItemTimeDateString.split(" ")[1])
                if (await currentItemTimeDateStringSplit == checkTrainDateTratovySplit) {

                    //Kontrola času a dátumu v "Aktuálne cesty" a otvorenie aktuálnej cesty
                    expect(await currentItemTimeDate.getText()).toContain((await checkTrainDateTratovySplit))
                    await currentItemTimeDate.click()

                    //Kontrola Mena a priezviska v Aktuálnych cestách
                    await this.CheckName(ticketName, ticketLastName)

                    if (await passengerItemName == (ticketName + " " + ticketLastName)) {
                        return
                    }
                }
            }
            await Swipe.swipeUp()
        }
    }

    async CheckTicketTratovy(ticketName, ticketLastName) {
        //Vyhľadanie konkrétneho lístka v Aktuálne cesty
        await this.findTicketResultTratovy(ticketName, ticketLastName)

        //Otvorenie dokladu a kontrola času a dátumu na cestovnom lístku
        if (!await this.showTickets.isDisplayed()) {
            await Swipe.swipeUp()
        }

        // Klik na Otvoriť doklady a kontrola mena a času
        await this.showTickets.click()
        expect(await checkTrainDateTratovySplit).toContain(await this.ticketValidityFrom.getText())
        //expect(await this.ticketValidityFrom.getText()).toContain(await checkTrainDateTratovySplit)

    }

}



export default new CheckTickets()