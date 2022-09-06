import AddPassenger from "../Methods/AddPassenger";
import CheckTickets, { checkTrainTime } from "../Methods/CheckTickets";
import HomeScreen from "../Methods/HomeScreen";
import OpenApp from "../Methods/OpenApp";
import OrderPassengers from "../Methods/OrderPassengers";
import Payment from "../Methods/Payment";
import Reservations from "../Methods/Reservations";
import Search from "../Methods/Search";
import TicketSelection from "../Methods/TicketSelection";


export let passenger =
{
    from: "Trenčín",
    to: "Trnava",
    trainType: "Os",
    name: "Ján", lastname: "Zelený",
    ageCategory: "dospely_26_61",
    discountCategory: "Bez zľavy",
    classNumber: "2",
    reservation: "bez miestenky",
    //firstClass: "miestenka",

    //dog: "1",
    //baggage: "1",
    bicycle: "1",
    serviceOnly: true
}


    describe(' '+ passenger.name + passenger.lastname + ' Nákup TRAŤOVÉHO líska a kontrola vygenerovania do sekcie "Aktuálne cesty"', () => {
        
        it('otvorenie app', async () => {
            await OpenApp.restarteApp()
        }); 
    
        it('Vyhľadanie spojenia - traťový lístok ', async () => {
            //await HomeScreen.tratovyListok()
            await Search.searchTratovy(passenger.from, passenger.to, passenger.trainType)
        });
     
        it('Kontrola dát - Od, Do, Dátum, Čas', async () => {
            await CheckTickets.ChecktrainTimeDateTratovy()
        });
    
        it('Pridanie cestujúceho', async () => {
            await AddPassenger.addPassengerName(passenger.name, passenger.lastname, passenger.ageCategory, passenger.discountCategory)
            await TicketSelection.nextBtn_1_3.waitForDisplayed({ timeout: 60000, })
        });
    
        it('Výber doplnkovej služby/miestenky', async () => {
            //pes, batozina, bicykel
            await OrderPassengers.addOrderToPassenger(passenger.dog, passenger.baggage, passenger.bicycle, passenger.serviceOnly)
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
            await CheckTickets.CheckTicketTratovy(passenger.name, passenger.lastname)
    
        });
    }); 
    