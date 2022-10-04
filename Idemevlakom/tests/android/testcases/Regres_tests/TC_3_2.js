import { UsersData_TC_3_2 } from "../../Data/TC_3_2_data";
import { trainDataArrayMock } from "../../Data/trainDataArrayMock";
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
import TicketSelection from "../../Methods/TicketSelection";
const allureReporter = require('@wdio/allure-reporter').default


let e = UsersData_TC_3_2[0]
export let numberOfPushes = 0

describe('TC 3.2 - Nákup 1 lístka pre 6 cestujúcich, rôzne zľavové kategórie', () => {

    it('otvorenie app', async () => {
        await OpenApp.restarteApp()
        allureReporter.addDescription('TC 3.2')

    });

    xit('Odstránenie užívateľa ak je prihlásený', async () => {
        await CreateAccount.removeAccount()
    });

    it('Vyhľadanie spojenia ' + UsersData_TC_3_2[0].from + ' - ' + UsersData_TC_3_2[0].to + '', async () => {
        await Search.search(UsersData_TC_3_2[0].from, UsersData_TC_3_2[0].to, 1)
    });

    it('Výber konkrétneho spojenia', async () => {
        await SearchResult.getResult(UsersData_TC_3_2[0].trainType, UsersData_TC_3_2[0].from, UsersData_TC_3_2[0].to)
    });

    it('Kontrola dát - Od, Do, Dátum, Čas', async () => {
        await CheckTickets.ChecktrainTimeDateOnly(UsersData_TC_3_2[0], UsersData_TC_3_2[0].from, UsersData_TC_3_2[0].to)
        console.log("----------------------- " + await trainDataArray[0]);
    });
    for (let e of UsersData_TC_3_2) {
        it('Pridanie cestujúceho ' + e.name + ' ' + e.lastname + '', async () => {
            await AddPassenger.addPassengerName(e.name, e.lastname, e.ageCategory, e.discountCategory, e.freeShipping, e.registrationNumber)
            await TicketSelection.nextBtn_1_3.waitForDisplayed({ timeout: 60000, })
            await CheckTickets.PushDataToTrainDataArray(e)
            numberOfPushes += 1
        });

        it('Výber doplnkovej služby/miestenky', async () => {
            //pes, batozina, bicykel
            await OrderPassengers.addOrderToPassengerwithoutNext(e.dog, e.baggage, e.bicycle)
            console.log("----------------------- " + await trainDataArray[0]);
        });
    }

    it('Ďalej', async () => {
        await OrderPassengers.addOrderToPassengerNextStep(e.dog, e.baggage, e.bicycle)

    });

    it('Voľba lístka - výber miestenky', async () => {
        await TicketSelection.nextBtn_2_3.waitForDisplayed({ timeout: 60000, })
        //Výber miestenky
        await Reservations.selectReservation(e.from, e.to, e.classNumber, e.reservation,)

        //Nie je daný typ miestenky - Vyhľadávanie znova
        console.log("----------------------- " + await trainDataArray[0])
        while (!isTicketClass || !isTicketReservation) {
            console.log("----------------------- " + await trainDataArray[0]);

            for (let k = 1; k < numberOfPushes; k++) {
                await trainDataArray.pop()
            }
            console.log("----------------------- " + await trainDataArray[0]);

            await SearchResult.getResult(e.trainType, e.from, e.to)
            await CheckTickets.ChecktrainTimeDateOnly(e, e.from, e.to)
            for (let e of UsersData_TC_3_2) {

                await AddPassenger.addPassengerName(e.name, e.lastname, e.ageCategory, e.discountCategory, e.freeShipping, e.registrationNumber)
                await TicketSelection.nextBtn_1_3.waitForDisplayed({ timeout: 60000, })

                await CheckTickets.PushDataToTrainDataArray(e)
                await OrderPassengers.addOrderToPassengerwithoutNext(e.dog, e.baggage, e.bicycle)
                console.log(trainDataArray[0]);
            }
            await OrderPassengers.addOrderToPassengerNextStep(e.dog, e.baggage, e.bicycle)
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

    xit('Platba kartou', async () => {
        await Payment.payByCart("4056070000000016", "12", "23")
    });

    it('Platba kreditom', async () => {
        await Payment.payByCredit()
    });

    it('Kontrola dokladov', async () => {
        console.log("----------------------- " + await trainDataArray[0]);
        console.log("----------------------- " + trainDataArrayMock[0]);
        await CheckTickets.CheckTicket(UsersData_TC_3_2, trainDataArray)


    });
});
