import { UsersData_0_0 } from "../Data/TC_0_0_BuyFlow";
import { trainDataArrayMock } from "../Data/trainDataArrayMock";
import AddPassenger from "../Methods/AddPassenger";
import Assertions from "../Methods/Assertions";
import CheckTickets, { trainFrom, trainDataArray, trainDataCheck } from "../Methods/CheckTickets";
import CreateAccount from "../Methods/CreateAccount";
import HomeScreen from "../Methods/HomeScreen";
import OpenApp from "../Methods/OpenApp";
import OrderPassengers from "../Methods/OrderPassengers";
import Payment from "../Methods/Payment";
import Reservations from "../Methods/Reservations";
import { isTicketClass, isTicketReservation } from "../Methods/Reservations_Methods";
import Search from "../Methods/Search";
import SearchResult from "../Methods/SearchResult";
import ShoppingCart from "../Methods/ShoppingCart";
import Swipe from "../Methods/Swipe";
import TicketSelection from "../Methods/TicketSelection";



describe(' Nákup JEDNORAZOVÉHO líska a kontrola vygenerovania do sekcie "Aktuálne cesty"', () => {

    xit('browser', async () => {
        browser.url('https://ebay.com')
    });

    it('otvorenie app', async () => {
        await OpenApp.restarteApp()
    });

    it('Odstránenie užívateľa ak je prihlásený', async () => {
        await CreateAccount.removeAccount()
        //await CreateAccount.createAccount("Peter", "Pavol", "david.jopcik@gmail.com", "dospely_26_61", "Bez zľavy")
    });

    for (let e of UsersData_0_0) {
        it('Pridanie cesty pri viacerých cestujúcich ' + e.from + e.to + ' ', async () => {
            while (await Payment.toPayBottomSelector.isDisplayed()) {
                await ShoppingCart.AddWay()
            }
        });

        it('Vyhľadanie spojenia ' + e.from + ' - ' + e.to + '', async () => {

            console.log("------------------------------" + isTicketClass);
            console.log("------------------------------" + isTicketReservation);
            //await HomeScreen.tratovyListok()
            await Search.search(e.from, e.to)
        });


        it('Výber konkrétneho spojenia', async () => {
            await SearchResult.getResult(e.trainType, e.from, e.to)
        });

        it('Kontrola dát - Od, Do, Dátum, Čas', async () => {
            await CheckTickets.ChecktrainTimeDate(e, e.from, e.to)
     
            console.log("----------------------- " + await trainDataArray[0]);
        });

        it('Pridanie cestujúceho ' + e.name + ' ' + e.lastname + '', async () => {
            await AddPassenger.addPassengerName(e.name, e.lastname, e.ageCategory, e.discountCategory, e.freeShipping, e.registrationNumber)
            await TicketSelection.nextBtn_1_3.waitForDisplayed({ timeout: 60000, })
        });

        it('Výber doplnkovej služby/miestenky', async () => {
            //pes, batozina, bicykel
            console.log("----------------------- " + await trainDataArray[0]);

            await OrderPassengers.addOrderToPassenger(e.dog, e.baggage, e.bicycle)
        });


        it('Voľba lístka - výber miestenky', async () => {
            await TicketSelection.nextBtn_2_3.waitForDisplayed({ timeout: 60000, })
            //Výber miestenky
            await Reservations.selectReservation(e.from, e.to, e.classNumber, e.reservation,)

            //Nie je daný typ miestenky - Vyhľadávanie znova
            console.log("----------------------- " + await trainDataArray[0]);
            while (!isTicketClass || !isTicketReservation) {
                console.log("----------------------- " + await trainDataArray[0]);

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

    it('test', async () => {
        await Swipe.swipeToLeft()
    });
    
    it('Kontrola dokladov', async () => {
        console.log("----------------------- " + await trainDataArray[0]);
        console.log("----------------------- " + trainDataArrayMock[0]);
        await CheckTickets.CheckTicket(UsersData_0_0, trainDataArray)
        

    });
});
