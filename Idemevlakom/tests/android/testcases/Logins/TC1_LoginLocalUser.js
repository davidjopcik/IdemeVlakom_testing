import { user_empty, user_invalid, user_valid_Jan, user_valid_Peter } from "../../Data/TC1_LoginUsers";
import { default as CreateAccount } from "../../Methods/CreateAccount";
import { default as OpenApp } from "../../Methods/OpenApp";
import allureReporter from '@wdio/allure-reporter'

describe('Sign in with valid/invalid data in Local Acoount', () => {

    it('Otvorenie app', async () => {
        await OpenApp.restarteApp()
        allureReporter.addDescription('TC 1')

    });

    it('TC 1.1 Vytvorenie užívateľa s nevalidným menom', async () => {
        await CreateAccount.createAccount(user_invalid.name, user_valid_Peter.lastname, user_valid_Peter.email, user_valid_Peter.ageCategory, user_valid_Peter.discountCategory)
    });

    it('TC 1.2 Vytvorenie užívateľa s nevalidným priezviskom', async () => {
        await CreateAccount.createAccount(user_valid_Peter.name, user_invalid.lastname, user_valid_Peter.email, user_valid_Peter.ageCategory, user_valid_Peter.discountCategory)
    });

    it('TC 1.3 Vytvorenie užívateľa s nevalidným emailom', async () => {
        await CreateAccount.createAccount(user_valid_Peter.name, user_valid_Peter.lastname, user_invalid.email, user_valid_Peter.ageCategory, user_valid_Peter.discountCategory)
    });

    it('TC 1.4 Vytvorenie užívateľa s prázdnym emailom', async () => {
        await CreateAccount.createAccount(user_valid_Peter.name, user_valid_Peter.lastname, user_empty.email, user_valid_Peter.ageCategory, user_valid_Peter.discountCategory)
    });

    it('TC 1.5 Vytvorenie užívateľa s prázdnym menom', async () => {
        await CreateAccount.createAccount(user_empty.name, user_valid_Peter.lastname, user_valid_Peter.email, user_valid_Peter.ageCategory, user_valid_Peter.discountCategory)
    });
});

describe('Create Valid Local Acoount', () => {

    it('Otvorenie app', async () => {
        await OpenApp.restarteApp()
    });


    it('TC 1.6 Vytvorenie užívateľa', async () => {
        await CreateAccount.createAccount(user_valid_Peter.name, user_valid_Peter.lastname, user_valid_Peter.email, user_valid_Peter.ageCategory, user_valid_Peter.discountCategory, user_valid_Peter.registryNumber)
    });
    it('Kontrola dát vytvoreného užívateľa',async () => {
        await CreateAccount.chceckDataAccountUser(user_valid_Peter.name + " " + user_valid_Peter.lastname, user_valid_Peter.discountCategory, user_valid_Peter.email, user_valid_Peter.registryNumber)
    });

});

describe('Edit created user', () => {

    it('Otvorenie app', async () => {
        await OpenApp.restarteApp()
    });

    it('TC 1.7 Edit created user',async () => {
        await CreateAccount.editUserInLocalProfile(user_valid_Jan.name, user_valid_Jan.lastname, user_valid_Jan.email, user_valid_Jan.ageCategory, user_valid_Jan.discountCategory, user_valid_Jan.registryNumber)
    });
    it('Kontrola dát editovaného užívateľa',async () => {
        await CreateAccount.chceckDataAccountUser(user_valid_Jan.name + " " + user_valid_Jan.lastname, user_valid_Jan.discountCategory, user_valid_Jan.email, user_valid_Jan.registryNumber)
    });
    
});