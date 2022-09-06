import { UsersData_3_1 } from "../../Data/TC_3_1_data";
import AddPassenger from "../../Methods/AddPassenger";
import Assertions from "../../Methods/Assertions";
import CheckTickets from "../../Methods/CheckTickets";
import CreateAccount from "../../Methods/CreateAccount";
import { default as OpenApp } from "../../Methods/OpenApp";
import OrderPassengers from "../../Methods/OrderPassengers";
import Payment from "../../Methods/Payment";
import Reservations, { ticketClassSelector } from "../../Methods/Reservations";
import Search from "../../Methods/Search";
import ShoppingCart from "../../Methods/ShoppingCart";
import TicketSelection from "../../Methods/TicketSelection";

export let classSelectorExist = ""

describe('TC 3.1 - 6 lístkov, 6 cestujúcich, rôzne zľavové kategórie', () => {

    it('Otvorenie/reštartovanie app', async () => {
        await OpenApp.restarteApp()
    });
    it('Odstránenie užívateľa ak je prihlásený',async () => {
        await CreateAccount.removeAccount()
    });

    for (let e of UsersData_3_1) {
        it('Pridanie cesty pri viacerých cestujúcich '+ e.from + e.to + ' ', async () => {
            while (await Payment.toPayBottomSelector.isDisplayed()) {
                await ShoppingCart.AddWay()
            }
        });

        it('Vyľadanie spojenie', async () => {
            await Search.search(e.from, e.to, e.trainType)
        });

        it('Kontrola dát - Od, Do, Dátum, Čas', async () => {
            await Assertions.CheckTrainFromInAddPassenger(e)
        });


        it('Pridanie cestujúceho '+e.name + e.lastname + '', async () => {
            await AddPassenger.addPassengerName(e.name, e.lastname, e.ageCategory, e.discountCategory, e.freeShipping, e.registrationNumber)
            await TicketSelection.nextBtn_1_3.waitForDisplayed({ timeout: 60000 })
        });

        it('Pridanie doplnkovej služby - pes, batožina, bicykel', async () => {
            await OrderPassengers.addOrderToPassenger(e.dog, e.baggage, e.bicycle)
        });

        it('Voľba lístka - miestenky', async () => {
            await TicketSelection.nextBtn_2_3.waitForDisplayed({ timeout: 60000 })
            //Miestenka
            await Reservations.selectReservation(e.classNumber, e.reservation, e.serviceReservation, e.trainType, e.from, e.to, e.name, e.lastname, e.ageCategory, e.discountCategory, e.freeShipping, e.registrationNumber, )
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

   
        xit('Kontrola dokladov', async () => {
            await CheckTickets.CheckTicket(e.name, e.lastname)
        });
    
});

