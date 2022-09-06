import { MCD_8_1 } from "../../Data/TC_8_1_data";
import { trainDataArrayMock } from "../../Data/trainDataArrayMock";
import AddPassenger from "../../Methods/AddPassenger";
import { default as CheckTickets, trainDataArray } from "../../Methods/CheckTickets";
import { default as CreateAccount } from "../../Methods/CreateAccount";
import { default as OpenApp } from "../../Methods/OpenApp";
import { default as OrderPassengers } from "../../Methods/OrderPassengers";
import { default as Payment } from "../../Methods/Payment";
import { default as Reservations } from "../../Methods/Reservations";
import { isTicketClass, isTicketReservation } from "../../Methods/Reservations_Methods";
import { default as Search } from "../../Methods/Search";
import { default as SearchResult } from "../../Methods/SearchResult";
import { default as ShoppingCart } from "../../Methods/ShoppingCart";
import { default as TicketSelection } from "../../Methods/TicketSelection";


describe(' Nákup JEDNORAZOVÉHO líska a kontrola vygenerovania do sekcie "Aktuálne cesty"', () => {

    it('otvorenie app', async () => {
        await OpenApp.restarteApp()
    });

    it('Odstránenie užívateľa ak je prihlásený', async () => {
        await CreateAccount.removeAccount()
    });

    for (let e of MCD_8_1) {
        it('Pridanie cesty pri viacerých cestujúcich ' + e.from + e.to + ' ', async () => {
            while (await Payment.toPayBottomSelector.isDisplayed()) {
                await ShoppingCart.AddWay()
            }
        });

        it('Vyhľadanie spojenia ' + e.from + ' - ' + e.to + '', async () => {
            await Search.search(e.from, e.to, 1)
        });

        it('Výber konkrétneho spojenia', async () => {
            await SearchResult.getResult(e.trainType, e.from, e.to)
        });

        it('Kontrola dát - Od, Do, Dátum, Čas', async () => {
            await CheckTickets.ChecktrainTimeDate(e, e.from, e.to)
        });

        it('Pridanie cestujúceho ' + e.name + ' ' + e.lastname + '', async () => {
            await AddPassenger.addPassengerName(e.name, e.lastname, e.ageCategory, e.discountCategory, e.freeShipping, e.registrationNumber)
            await TicketSelection.nextBtn_1_3.waitForDisplayed({ timeout: 60000, })
        });

        it('Výber doplnkovej služby/miestenky', async () => {
            //pes, batozina, bicykel
            await OrderPassengers.addOrderToPassenger(e.dog, e.baggage, e.bicycle)
        });

        it('Voľba lístka - výber miestenky', async () => {
            await TicketSelection.nextBtn_2_3.waitForDisplayed({ timeout: 60000, })
            //Výber miestenky
            await Reservations.selectReservation(e.from, e.to, e.classNumber, e.reservation,)

            //Nie je daný typ miestenky - Vyhľadávanie znova
            while (!isTicketClass || !isTicketReservation) {
                await SearchResult.getResult(e.trainType, e.from, e.to)
                await CheckTickets.ChecktrainTimeDate(e, e.from, e.to)
                await AddPassenger.addPassengerName(e.name, e.lastname, e.ageCategory, e.discountCategory, e.freeShipping, e.registrationNumber)
                await TicketSelection.nextBtn_1_3.waitForDisplayed({ timeout: 60000, })
                await OrderPassengers.addOrderToPassenger(e.dog, e.baggage, e.bicycle)
                await TicketSelection.nextBtn_2_3.waitForDisplayed({ timeout: 60000, })
                //Výber miestenky
                await Reservations.selectReservation(e.from, e.to, e.classNumber, e.reservation,)
            }
        });

        it('Voľba lístka - pokračovanie', async () => {
            await TicketSelection.nextBtn_2_3.click()
            await TicketSelection.nextBtn_3_3.waitForDisplayed({ timeout: 60000 })
            await TicketSelection.nextBtn_3_3.click()
        });
    }

    it('Platba kartou', async () => {
        await Payment.payByCart("4056070000000016", "12", "23")
    });

    it('Kontrola dokladov', async () => {
        console.log("----------------------- " + await trainDataArray[0]);
        console.log("----------------------- " + trainDataArrayMock[0]);
        await CheckTickets.CheckTicket(MCD_8_1, trainDataArray)
    });
});
