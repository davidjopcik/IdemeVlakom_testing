import { MCD_8_2 } from "../../Data/TC_8_2_data";
import AddPassenger from "../../Methods/AddPassenger";
import CheckTickets from "../../Methods/CheckTickets";
import { default as CreateAccount } from "../../Methods/CreateAccount";
import FailsErrors from "../../Methods/FailsErrors";
import { default as OpenApp } from "../../Methods/OpenApp";
import Payment from "../../Methods/Payment";
import Reservations from "../../Methods/Reservations";
import Search from "../../Methods/Search";
import TicketSelection from "../../Methods/TicketSelection";
const allureReporter = require('@wdio/allure-reporter').default


describe('TC 8.1 - Nákup 1 MCD pre 6 cestujúcich, rôzne zľavové kategórie', () => {
    it('Otvorenie app',async () => {
        await OpenApp.restarteApp()
        allureReporter.addDescription('TC 8.2')

        
    });

    it('Odstránenie užívateľa',async () => {
        await CreateAccount.removeAccount()
    });

    it('Vyhľadanie spojenia',async () => {
        //Vyhľadanie vlaku
        await Search.search(MCD_8_2[0].from, MCD_8_2[0].to, MCD_8_2[0].trainType, 2)
    });

    it('Kontrola dát - Od, Do, Dátum, Čas', async () => {
        await CheckTickets.ChecktrainTimeDate()
    });

    for(let e of MCD_8_2){
        it('Pridanie cestujúceho', async () => {
            await AddPassenger.addPassengerName(e.name, e.lastname, e.ageCategory, e.discountCategory, e.freeShipping, e.registrationNumber)
            await TicketSelection.nextBtn_1_3.waitForDisplayed({ timeout: 60000, })
        });
    }

    it('Try to find segment',async () => {
        await TicketSelection.nextBtn_1_3.click()
        await FailsErrors.nextBtn1_3_Err(MCD_8_2[0].from)
        await Reservations.numberOfSegments(MCD_8_2[0].to)
    });

    it('Voľba lístka - výber miestenky', async () => {
        await TicketSelection.nextBtn_2_3.waitForDisplayed({ timeout: 60000, })
        //Výber miestenky
        await Reservations.selectReservation(MCD_8_2[0].classNumber, MCD_8_2[0].reservation, MCD_8_2[0].serviceReservation, MCD_8_2[0].trainType, MCD_8_2[0].from, MCD_8_2[0].to, MCD_8_2[0].name, MCD_8_2[0].lastname, MCD_8_2[0].ageCategory, MCD_8_2[0].discountCategory, MCD_8_2[0].freeShipping, MCD_8_2[0].registrationNumber, MCD_8_2[0].MCDtype)
    });

    it('Vloženie do košíka',async () => {
        await TicketSelection.nextBtn_2_3.click()
        await TicketSelection.nextBtn_3_3.waitForDisplayed({ timeout: 60000, })
        await TicketSelection.nextBtn_3_3.click()
    });
    

    it('Platba kartou', async () => {
        await Payment.payByCart("4056070000000016", "12", "23")
    })

    xit('Kontrola dokladov', async () => {
        //expect(currentItemTimeDate).toBeDisplayed()
        await CheckTickets.CheckTicket(e.name, e.lastname)

    });
    
    
});