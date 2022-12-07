import { user_empty, user_invalid, user_valid_Peter } from "../../../android/Data/TC1_LoginUsers";
import CreateAccountIOS from "../../Methods/CreateAccountIOS";
import { default as HomeScreenIOS } from "../../Methods/HomeScreenIOS";
import { default as OpenAppIOS } from "../../Methods/OpenAppIOS";

xdescribe('Sign in with valid/invalid data in Local Acoount', () => {
    it('Otvorenie app', async () => {
       await OpenAppIOS.restarteApp()
    });
    //IOS povoľuje všetky znaky v mene aj priezvisku
    xit('TC 1.1 Vytvorenie užívateľa s nevalidným menom', async () => {
        await CreateAccountIOS.createAccount(user_invalid.name, user_valid_Peter.lastname, user_valid_Peter.email, user_valid_Peter.ageCategory, user_valid_Peter.discountCategory)
    });

    //IOS povoľuje všetky znaky v mene aj priezvisku
    xit('TC 1.2 Vytvorenie užívateľa s nevalidným priezviskom', async () => {
        await CreateAccountIOS.createAccount(user_valid_Peter.name, user_invalid.lastname, user_valid_Peter.email, user_valid_Peter.ageCategory, user_valid_Peter.discountCategory)
    });

    it('TC 1.3 Vytvorenie užívateľa s nevalidným emailom', async () => {
        await CreateAccountIOS.createAccount(user_valid_Peter.name, user_valid_Peter.lastname, user_invalid.email, user_valid_Peter.ageCategory, user_valid_Peter.discountCategory)
    });

    it('TC 1.4 Vytvorenie užívateľa s prázdnym emailom', async () => {
        await CreateAccountIOS.createAccount(user_valid_Peter.name, user_valid_Peter.lastname, user_empty.email, user_valid_Peter.ageCategory, user_valid_Peter.discountCategory)
    });

    it('TC 1.5 Vytvorenie užívateľa s prázdnym menom', async () => {
        await CreateAccountIOS.createAccount(user_empty.name, user_valid_Peter.lastname, user_valid_Peter.email, user_valid_Peter.ageCategory, user_valid_Peter.discountCategory)
    });
});

describe('Create Valid Local Acoount', () => {

    it('Otvorenie app', async () => {
        await OpenAppIOS.restarteApp()
    });

    it('TC 1.6 Vytvorenie užívateľa', async () => {
        await CreateAccountIOS.createAccount(user_valid_Peter.name, user_valid_Peter.lastname, user_valid_Peter.email, user_valid_Peter.ageCategory, user_valid_Peter.discountCategory, user_valid_Peter.registryNumber)
    });
    it('Kontrola dát vytvoreného užívateľa',async () => {
        await CreateAccountIOS.chceckDataAccountUser(user_valid_Peter.name + " " + user_valid_Peter.lastname, user_valid_Peter.ageCategory, user_valid_Peter.discountCategory, user_valid_Peter.email, user_valid_Peter.registryNumber)
    });

});