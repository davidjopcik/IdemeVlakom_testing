import { user_empty, user_invalid } from "../Data/TC1_LoginUsers"
import AddPassenger from "./AddPassenger"
import HomeScreen from "./HomeScreen"
import Swipe from "./Swipe"


class CreatAccount {
    get loginButtonZSSKID() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_account_crosroad_zssk_login_button"]')
    }
    get createName() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_local_account_editor_first_name"]')
    }
    get createLastName() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_local_account_editor_last_name"]')
    }
    get createEmail() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_local_account_editor_email"]')
    }
    get createAgeCategory() {
        return $('//*[@resource-id="android:id/text1"]')
    }
    get createDiscountCategory() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_local_account_editor_age_category_discount"]')
    }
    get createRegistryNumber() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_local_account_editor_registration_number"]')
    }
    get createRegistryNumberCheckBox() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_local_account_editor_free_transport_available"]')
    }
    get createLocalAccountBtn() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_local_account_action_button"]')
    }
    get clickOnAccount() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_drawer_header_name"]')
    }
    get removeAccountSelector() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_account_info_delete"]')
    }
    get signToAccountText() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_drawer_header_ca_or_lp_text" and contains(@text, "Prihlásiť do zákazníckeho konta ZSSK ID alebo vytvoriť lokálny profil")]')
    }
    get errorMsgInvalidEmail() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/textinput_error" and contains(@text, "Vyplňte e-mail v správnom tvare")]')
    }
    get errorMsgEmptyEmail() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/textinput_error" and contains(@text, "Vyplňte e-mail")]')
    }
    get errorMsgInvalidName() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/textinput_error" and contains(@text, "Vyplňte meno v správnom tvare")]')
    }
    get errorMsgEmptyName() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/textinput_error" and contains(@text, "Vyplňte meno")]')
    }
    get errorMsgInvalidLastname() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/textinput_error" and contains(@text, "Vyplňte priezvisko v správnom tvare")]')
    }
    get errorMsgEmptyLastname() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/textinput_error" and contains(@text, "Vyplňte priezvisko")]')
    }
    get YesButton() {
        return $('//*[@resource-id="android:id/button1" and contains(@text, "ÁNO")]')
    }
    get NoButton(){
        return $('//*[@text="NIE"]')
    }
    get userNameInSideBar() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_drawer_header_name"]')
    }
    get userNameInLocalProfil() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_account_info_name"]')
    }
    get emailInLocalProfil() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_account_info_email"]')
    }
    get discountCategoryInLocalProfil() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_account_info_age_discount_category"]')
    }
    get registryNumberInLocalProfil() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_account_info_registration_number"]')
    }
    get editAccount() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_account_info_edit"]')
    }
    get emailZSSKAccountInSideBar(){
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_drawer_header_email"]')
    }
    get messageAlertIfDeleteAccount(){
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/alertTitle"]')
    }
   

    async fillUserDatainLocalProfile(name, lastname, email, ageCategory, discountCtegory, registryNumber){
        await this.createName.setValue(name)
        await this.createLastName.setValue(lastname)
        await this.createEmail.setValue(email)
        await this.createAgeCategory.click()
        await AddPassenger.ageCategorySelect(ageCategory)
        await this.createDiscountCategory.click()
        await AddPassenger.selectDiscountCategory(discountCtegory)
        if(!await registryNumber == ""){
            await this.createRegistryNumber.setValue(registryNumber)
            await this.createRegistryNumberCheckBox.click()
        }

        if (email == user_invalid.email) {
            expect(await this.errorMsgInvalidEmail.getText()).toBeDisplayed()
        }
        if (name === user_invalid.name) {
            expect(await this.errorMsgInvalidName.getText()).toBeDisplayed()
        }
        if (lastname == user_invalid.lastname) {
            expect(await this.errorMsgInvalidLastname.getText()).toBeDisplayed()
        }
        if (email == user_empty.email) {
            expect(await this.errorMsgEmptyEmail.getText()).toBeDisplayed()
        }
        if (name == user_empty.name) {
            expect(await this.errorMsgEmptyName.getText()).toBeDisplayed()
        }
        if (lastname == user_empty.lastname) {
            expect(await this.errorMsgEmptyLastname.getText()).toBeDisplayed()
        }

        if(!await this.createLocalAccountBtn.isDisplayed()){
             await Swipe.swipeUp()
        }
        await this.createLocalAccountBtn.click()
        if (await this.createLocalAccountBtn.isDisplayed()) {
            await HomeScreen.navigateUp.click()
        }
    }

    async createAccount(name, lastname, email, ageCategory, discountCtegory, registryNumber) {
        await HomeScreen.navPanel.waitForDisplayed({ timeout: 20000 })
        await HomeScreen.navPanel.click()
        if (!await this.signToAccountText.isDisplayed()) {
            await this.removeAccount()
            await HomeScreen.navPanel.waitForDisplayed()
            await HomeScreen.navPanel.click()
        }

        await HomeScreen.createAccount.waitForDisplayed()
        await HomeScreen.createAccount.click()
        await this.loginButtonZSSKID.waitForDisplayed()
        while (!await this.createLocalAccountBtn.isDisplayed()) {
            await Swipe.swipeUp()
        }

        await this.fillUserDatainLocalProfile(name, lastname, email, ageCategory, discountCtegory, registryNumber)      
    }

    async chceckDataAccountUser(userName, discountCategory, email, registryNumber){
        if(!await this.userNameInLocalProfil.isDisplayed()){
            await HomeScreen.navPanel.waitForDisplayed({ timeout: 20000 })
            await HomeScreen.navPanel.click()
        
      
        
        await expect(this.userNameInSideBar).toHaveText(userName)
        await HomeScreen.userName.click()
    }

        await this.userNameInLocalProfil.waitForDisplayed({ timeout: 20000 })
        await expect(this.userNameInLocalProfil).toHaveText(userName) 
        await expect(this.discountCategoryInLocalProfil).toHaveText(discountCategory) 
        await expect(this.emailInLocalProfil).toHaveText(email) 
        if(!await registryNumber == ""){
            await expect(this.registryNumberInLocalProfil).toHaveText(registryNumber)
            }
        await HomeScreen.navigateUp.click()
    }

    async editUserInLocalProfile(name, lastname, email, ageCategory, discountCtegory, registryNumber){
        if(!await this.userNameInLocalProfil.isDisplayed()){
            await HomeScreen.navPanel.waitForDisplayed({ timeout: 20000 })
            await HomeScreen.navPanel.click()
        
        await HomeScreen.userName.click()
    }
        await this.editAccount.click()
        await this.fillUserDatainLocalProfile(name, lastname, email, ageCategory, discountCtegory, registryNumber)
    }

    async removeAccount() {
        if(!(await this.userNameInLocalProfil.isDisplayed() || await this.userNameInSideBar.isDisplayed())){
            await HomeScreen.navPanel.waitForDisplayed({ timeout: 20000 })
            await HomeScreen.navPanel.click()
    }
        if(!await this.signToAccountText.isDisplayed()){
            await HomeScreen.userName.click()
            await this.removeAccountSelector.click()
            await this.YesButton.click()

            if((await this.messageAlertIfDeleteAccount).isDisplayed()){
                (await this.YesButton).click()
            }
            await HomeScreen.navPanel.waitForDisplayed()
            await HomeScreen.navPanel.click()
            await expect(this.signToAccountText).toBeDisplayed()
            ;(await HomeScreen.buyTicket).click()
        }
        else{
            await HomeScreen.buyTicket.click()
        }
        
    }

    async loginToZSSKAccount(email, password){
        await HomeScreen.navPanel.waitForDisplayed()
        await HomeScreen.navPanel.click()

        if((!await this.emailZSSKAccountInSideBar).isDisplayed()){
            await HomeScreen.createAccount.waitForDisplayed()
            await HomeScreen.createAccount.click()
    
            await this.loginButtonZSSKID.waitForDisplayed()
            await this.loginButtonZSSKID.click()
        }
        (await HomeScreen.actualWays).click()
      

        //TODO        
    }

}

export default new CreatAccount()