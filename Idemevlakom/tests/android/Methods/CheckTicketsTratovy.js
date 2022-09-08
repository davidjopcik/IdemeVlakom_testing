import { firstIdIntrainDataArray, isEmptyTrainDataArray, trainDataArray, trainDataCheck } from "./CheckTickets";
import Swipe from "./Swipe";




class CheckticketsTratovy {

   

   




    async findTicketResultTratovy2(userData, i) {

        while (!await ticketItemTimeDate.isDisplayed()) {
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
                    await this.CheckName(i)

                    if (await passengerItemName == (i.ticketName + " " + i.ticketLastName)) {
                        return
                    }
                }
            }
            await Swipe.swipeUp()
        }
    }

    async findTicketResultTratovy(userData, i){
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

export default new CheckticketsTratovy()