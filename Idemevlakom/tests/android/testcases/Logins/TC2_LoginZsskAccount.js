import CreateAccount from "../../Methods/CreateAccount";
import HomeScreen from "../../Methods/HomeScreen";
import { default as OpenApp } from "../../Methods/OpenApp";
export const email = 'david.jopcik@gmail.com'
export const password = 'Aa123456'

describe('Login into ZSSK account', () => {
    it('App open',async () => {
        await OpenApp.restarteApp()
    });

    it('Sign in ZSSK account',async () => {
        await CreateAccount.loginToZSSKAccount(email, password)
    });
});