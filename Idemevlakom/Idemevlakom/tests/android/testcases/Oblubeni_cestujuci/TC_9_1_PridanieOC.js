import AddPassenger from "../../Methods/AddPassenger";
import { default as CreateAccount } from "../../Methods/CreateAccount";
import { default as OpenApp } from "../../Methods/OpenApp";
import Search from "../../Methods/Search";
import SearchResult from "../../Methods/SearchResult";

describe('Pridať obľúbeného cestujúceho do zoznamu s rôznymi inputmi', () => {

   
        it('Obľúbený cestujúci s korektnými imputmi', async () => {
            await OpenApp.restarteApp()
            await CreateAccount.removeAccount()
            await Search.search("Čadca", "Žilina")
            await SearchResult.getResult("Os")
            for(let e of TC_9_1_correct_data){
                await AddPassenger.addPassengerName(e.name, e.lastname, e.ageCategory, e.discountCategory, e.freeShipping, e.registrationNumber)
            }
        
        });
   
    
    

});