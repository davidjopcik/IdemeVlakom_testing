import AddPassenger from "../../Methods/AddPassenger";
import CheckTickets from "../../Methods/CheckTickets";
import OpenApp from "../../Methods/OpenApp";
import Search from "../../Methods/Search";
import TicketSelection from "../../Methods/TicketSelection";
import { passengers_TC_100_names } from "../../Data/TC_100";
import OrderPassengers from "../../Methods/OrderPassengers";
import Payment from "../../Methods/Payment";

export let passenger =
{
    from: "Žilina",
    to: "Považská Bystrica",
    trainType: "Os",
    //name: "Ján", lastname: "Zelený",
    ageCategory: "dospely_26_61",
    discountCategory: "bez_zlavy",
    classNumber: "",
    reservation: "",
    //firstClass: "miestenka",
    //dog: "1",
    //baggage: "1",
    //bicycle: "1"
}
for(let i of passengers_TC_100_names){


describe(''+ i.name + i.lastname + ' Nákup 25 JEDNORAZOVÝCH lískov a kontrola vygenerovania do sekcie "Aktuálne cesty"', () => {
    it('otvorenie app', async () => {
        await OpenApp.restarteApp()
    }); 

    it('Vyhľadanie spojenie', async () => {
        await Search.search(passenger.from, passenger.to, passenger.trainType)
    });

    it('Kontrola dát - Od, Do, Dátum, Čas', async () => {
        //Pri traťovom zakomentovať
        await CheckTickets.ChecktrainTimeDate()
    });

    it('Pridanie cestujúceho', async () => {
        await AddPassenger.addPassengerName(i.name, i.lastname, passenger.ageCategory, passenger.discountCategory)
        await TicketSelection.nextBtn_1_3.waitForDisplayed({ timeout: 60000, })
    });

    xit('Len doplnková služba alebo miestenka', async () => {
        await AddPassenger.orderOnly()
    });


    it('Pridanie doplnkovej služby', async () => {
        //pes, batozina, bicykel
        await OrderPassengers.addOrderToPassenger(passenger.dog, passenger.baggage, passenger.bicycle)
    });
});


describe('Výber miestenky a platba', () => {

    it('Voľba lístka - výber miestenky', async () => {
        await TicketSelection.nextBtn_2_3.waitForDisplayed({ timeout: 60000, })
        //Výber miestenky
        //await Reservations.selectReservation(passenger.classNumber, passenger.reservation )

        await TicketSelection.nextBtn_2_3.click()
        await TicketSelection.nextBtn_3_3.waitForDisplayed({ timeout: 60000, })
        await TicketSelection.nextBtn_3_3.click()
    });

    it('Platba kartou', async () => {
        //await TicketSelection.nextBtn.click()
        await Payment.payByCart("4056070000000016", "12", "23")
    });

    it('Kontrola dokladov', async () => {
        //expect(currentItemTimeDate).toBeDisplayed()
        await CheckTickets.CheckTicket(i.name, i.lastname)

    });
});
}
