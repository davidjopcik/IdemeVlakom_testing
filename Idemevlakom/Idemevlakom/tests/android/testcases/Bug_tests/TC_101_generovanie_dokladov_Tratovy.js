import { passengers_TC_100_names } from "../../Data/TC_100";
import AddPassenger from "../../Methods/AddPassenger";
import CheckTickets, { checkTrainDateTratovySplit } from "../../Methods/CheckTickets";
import HomeScreen from "../../Methods/HomeScreen";
import OrderPassengers from "../../Methods/OrderPassengers";
import Payment from "../../Methods/Payment"; 
import Search from "../../Methods/Search";
import TicketSelection from "../../Methods/TicketSelection"; 
import OpenApp from "../../Methods/OpenApp";


export let passengerTC_101 =
{
    from: "Trenčín",
    to: "Trnava",
    trainType: "Os",
    //name: "Ján", lastname: "Zelený",
    ageCategory: "mlady_16_25",
    discountCategory: "SLOVAK JUNIOR",
    classNumber: "",
    reservation: "",
    //firstClass: "miestenka",
    dog: "1",
    baggage: "2",
    //bicycle: "1",
    //serviceOnly: true
}

for(let i of passengers_TC_100_names){
describe(' '+ i.name + i.lastname + ' Nákup 25 TRAŤOVÝCH lískov a kontrola vygenerovania do sekcie "Aktuálne cesty"', () => {
    
    it('otvorenie app', async () => {
        await OpenApp.restarteApp()
    }); 

    it('Vyhľadanie spojenia - traťový lístok ', async () => {
        //await HomeScreen.tratovyListok()
        await Search.searchTratovy(passengerTC_101.from, passengerTC_101.to, passengerTC_101.trainType)
    });
 
    it('Kontrola dát - Od, Do, Dátum, Čas', async () => {
        await CheckTickets.ChecktrainTimeDateTratovy()
    });

    it('Pridanie cestujúceho', async () => {
        await AddPassenger.addPassengerName(i.name, i.lastname, passengerTC_101.ageCategory, passengerTC_101.discountCategory)
        await TicketSelection.nextBtn_1_3.waitForDisplayed({ timeout: 60000, })
    });

    it('Výber doplnkovej služby/miestenky', async () => {
        //pes, batozina, bicykel
        await OrderPassengers.addOrderToPassenger(passengerTC_101.dog, passengerTC_101.baggage, passengerTC_101.bicycle, passengerTC_101.serviceOnly)
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

    it.only('Platba kartou', async () => {
        //await TicketSelection.nextBtn.click()
        await Payment.payByCart("4056070000000016", "12", "23")
    });

    xit('Kontrola dokladov', async () => {
        //expect(currentItemTimeDate).toBeDisplayed()
        await CheckTickets.CheckTicketTratovy(i.name, i.lastname)

    });
}); 
}