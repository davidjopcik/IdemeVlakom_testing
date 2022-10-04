import { UsersData_TC_3_3 } from "../../Data/TC_3_3_data";
import AddPassenger from "../../Methods/AddPassenger";
import CheckTickets, { trainDataArray } from "../../Methods/CheckTickets";
import { default as OpenApp } from "../../Methods/OpenApp";
import OrderPassengers from "../../Methods/OrderPassengers";
import Payment from "../../Methods/Payment";
import Reservations from "../../Methods/Reservations";
import Search from "../../Methods/Search";
import TicketSelection from "../../Methods/TicketSelection";
const allureReporter = require('@wdio/allure-reporter').default


export let passenger = UsersData_TC_3_3[0]

describe('TC 3.3 - Nákup 1 traťového lístka', () => {
    it('otvorenie app', async () => {
        await OpenApp.restarteApp()
        allureReporter.addDescription('TC 3.3')

    }); 

    it('Vyhľadanie spojenia - traťový lístok ', async () => {
        await Search.searchTratovy(passenger.from, passenger.to, passenger.trainType)
    });

    it('Kontrola dát - Od, Do, Dátum, Čas', async () => {
        await CheckTickets.ChecktrainTimeDateTratovy(passenger)
        console.log(trainDataArray[0]);
    });

    it('Pridanie cestujúceho', async () => {
        await AddPassenger.addPassengerName(passenger.name, passenger.lastname, passenger.ageCategory, passenger.discountCategory)
        await TicketSelection.nextBtn_1_3.waitForDisplayed({ timeout: 60000, })
    });

    it('Výber doplnkovej služby/miestenky', async () => {
        await OrderPassengers.addOrderToPassenger(passenger.dog, passenger.baggage, passenger.bicycle, passenger.serviceOnly)
    });

    it('Voľba lístka - výber miestenky', async () => {
        await TicketSelection.nextBtn_2_3.waitForDisplayed({ timeout: 60000, })
        await Reservations.selectValidity(passenger.validity)
        await Reservations.selectWayType(passenger.wayType)
        await TicketSelection.nextBtn_2_3.click()
        await TicketSelection.nextBtn_3_3.waitForDisplayed({ timeout: 60000, })
        await TicketSelection.nextBtn_3_3.click()
    });

    xit('Platba kartou', async () => {
        await Payment.payByCart("4056070000000016", "12", "23")
    });

    it('Platba kreditom', async () => {
        await Payment.payByCredit()
    });

    it('Kontrola dokladov', async () => {
        console.log(trainDataArray[0]);
        await CheckTickets.CheckTicket(UsersData_TC_3_3, trainDataArray)
    });

});