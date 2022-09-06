import Browser from "../../Methods/Browser";
import CreateAccount from "../../Methods/CreateAccount";
import Payment from "../../Methods/Payment";
import Reservations from "../../Methods/Reservations";
import ShoppingCart from "../../Methods/ShoppingCart";
import TicketSelection from "../../Methods/TicketSelection";

const { default: AddPassenger } = require("../../Methods/AddPassenger");
const { default: OpenApp } = require("../../Methods/OpenApp");
const { default: OrderPassengers } = require("../../Methods/OrderPassengers");
const { default: Search } = require("../../Methods/Search");
const { default: SearchResult } = require("../../Methods/SearchResult");

export const passengers = [
    { name: "Peter", lastname: "Adamson", ageCategory: "dospely_26_61", discountCategory: "Bez zľavy", bicycle: "2", classNumber: "2. TRIEDA",
    reservation: "miestenka", serviceReservation: "v pojazdnej úschovni s miestenkou na bicykel" },
    { name: "Pavol", lastname: "Amos", ageCategory: "mlady_16_25",discountCategory: "Bez zľavy", bicycle: "2"}, 
    { name: "Ján", lastname: "Franks", ageCategory: "dospely_62_69",discountCategory: "Bez zľavy", bicycle: "1"}, 
]



describe('Sold Out all bikes', () => {
    xit('Chceck free services',async () => {
        
        await OpenApp.openGoogleBrowser()
        await Browser.findInBrowser("https://ebay.com")
        
        const search = $('//*[@resource-id="kw"]')
        const searchBtn = $('//*[@text="Search"]')
        await search.waitForDisplayed()
        await search.click()

        await search.setValue('shoes')
        await searchBtn.click()




        //await expect($("//*[@text='Vyhľadanie spojenia']")).toBeDisplayed()
        //await Browser.SearchFromToInBrowser("Žilina", "Bratislava hl.st.")
        //await Browser.SelectSearchedTrainInBrowser("Žilina")
    
    })

    it('open app and signout account', async () => {
        await OpenApp.restarteApp()
        await CreateAccount.removeAccount()
    });


        it('Find train with bikes', async () => {
            await Search.search("Bratislava hl.st.", "Žilina", "R 611")
        });

        
        it('Add passengers with bicycle', async () => {
            for (let e of passengers) {
            await AddPassenger.addPassengerName(e.name, e.lastname, e.ageCategory, e.discountCategory)
            await OrderPassengers.addOrderToPassengerwithoutNext(e.dog, e.baggage, e.bicycle)


        }
        });
       
        it('Select Services and next to pay',async () => {
            await TicketSelection.nextBtn_1_3.click()
            await OrderPassengers.chceckOrderName(passengers.dog, passengers.baggage, passengers.bicycle)

            await Reservations.selectReservation(passengers[0].classNumber, passengers[0].reservation, passengers[0].serviceReservation,)

            await TicketSelection.nextBtn_2_3.waitForDisplayed({ timeout: 15000 })
            await TicketSelection.nextBtn_2_3.waitForDisplayed({ timeout: 60000 })
            await TicketSelection.nextBtn_2_3.click()

            await TicketSelection.nextBtn_3_3.waitForDisplayed({ timeout: 60000 })
            await TicketSelection.nextBtn_3_3.click()
        });

        it('Platba kartou', async () => {
            //await TicketSelection.nextBtn.click()
            await Payment.payByCart("4056070000000016", "12", "23")
        });
        
    

});