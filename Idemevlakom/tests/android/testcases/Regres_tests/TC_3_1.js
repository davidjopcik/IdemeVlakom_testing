import { UsersData_3_1 } from "../../Data/TC_3_1_data";
import AddPassenger from "../../Methods/AddPassenger";
import CheckTickets, { trainDataArray } from "../../Methods/CheckTickets";
import CreateAccount from "../../Methods/CreateAccount";
import { default as OpenApp } from "../../Methods/OpenApp";
import OrderPassengers from "../../Methods/OrderPassengers";
import Payment from "../../Methods/Payment";
import Reservations from "../../Methods/Reservations";
import { isTicketClass, isTicketReservation } from "../../Methods/Reservations_Methods";
import Search from "../../Methods/Search";
import SearchResult from "../../Methods/SearchResult";
import ShoppingCart from "../../Methods/ShoppingCart";
import TicketSelection from "../../Methods/TicketSelection";
const allureReporter = require('@wdio/allure-reporter').default


export let classSelectorExist = ""

describe('TC 3.1 - Nákup 6 lístkov pre 6 cestujúcich, rôzne zľavové kategórie', () => {

    it('Otvorenie/reštartovanie app', async () => {
        await OpenApp.restarteApp()
        allureReporter.addDescription('TC 3.1')
    });
    xit('Odstránenie užívateľa ak je prihlásený', async () => {
        await CreateAccount.removeAccount()
    });

    for (let e of UsersData_3_1) {
        it('Pridanie cesty pri viacerých cestujúcich ' + e.from + e.to + ' ', async () => {
            while (await Payment.toPayBottomSelector.isDisplayed()) {
                await ShoppingCart.AddWay()
            }
        });

        it('Vyľadanie spojenie', async () => {
            await Search.search(e.from, e.to, 2)
        });

        it('Výber konkrétneho spojenia', async () => {
            await SearchResult.getResult(e.trainType, e.from, e.to)
        });

        it('Kontrola dát - Od, Do, Dátum, Čas', async () => {
            await CheckTickets.ChecktrainTimeDate(e, e.from, e.to)
        });

        it('Pridanie cestujúceho ' + e.name + e.lastname + '', async () => {
            await AddPassenger.addPassengerName(e.name, e.lastname, e.ageCategory, e.discountCategory, e.freeShipping, e.registrationNumber)
            await TicketSelection.nextBtn_1_3.waitForDisplayed({ timeout: 60000, })
        });

        it('Pridanie doplnkovej služby - pes, batožina, bicykel', async () => {
            await OrderPassengers.addOrderToPassenger(e.dog, e.baggage, e.bicycle)
        });

        it('Voľba lístka - miestenky', async () => {
            await TicketSelection.nextBtn_2_3.waitForDisplayed({ timeout: 60000 })
            await Reservations.selectReservation(e.from, e.to, e.classNumber, e.reservation)

            //Nie je daný typ miestenky - Vyhľadávanie znova
            while (!isTicketClass || !isTicketReservation) {
                console.log("----------------------- " + await trainDataArray[0]);

                await SearchResult.getResult(e.trainType, e.from, e.to)
                await CheckTickets.ChecktrainTimeDate(e, e.from, e.to)
                await AddPassenger.addPassengerName(e.name, e.lastname, e.ageCategory, e.discountCategory, e.freeShipping, e.registrationNumber)
                await TicketSelection.nextBtn_1_3.waitForDisplayed({ timeout: 60000, })
                await OrderPassengers.addOrderToPassenger(e.dog, e.baggage, e.bicycle)
                await TicketSelection.nextBtn_2_3.waitForDisplayed({ timeout: 60000, })
                await Reservations.selectReservation(e.from, e.to, e.classNumber, e.reservation,)
            }
        });

        it('Voľba lístka - pokračovanie', async () => {
            await TicketSelection.nextBtn_2_3.click()
            await TicketSelection.nextBtn_3_3.waitForDisplayed({ timeout: 60000 })
            await TicketSelection.nextBtn_3_3.click()
        });
    }

    xit('Platba kartou', async () => {
        await Payment.payByCart("4056070000000016", "12", "23")
    });

    it('Platba kreditom', async () => {
        await Payment.payByCredit()
    });

    it('Kontrola dokladov', async () => {
        await CheckTickets.CheckTicket(UsersData_3_1, trainDataArray)
    });

});

