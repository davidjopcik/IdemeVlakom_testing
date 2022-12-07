import { user_empty, user_invalid } from "../../android/Data/TC1_LoginUsers"
import AddPassenger from "../../android/Methods/AddPassenger"
import Swipe from "../../android/Methods/Swipe"
import AddPassengerIOS from "./AddPassengerIOS"
import HomeScreenIOS from "./HomeScreenIOS"

class CreatAccount {
    get loginButtonZSSKID() {
        return $('//*[@name="Prihlásiť do zákazníckeho konta ZSSK ID"]')
    }
    get createName() {
        return $('//*[@value="* Meno"]')
    }
    get createLastName() {
        return $('//*[@value="* Priezvisko"]')
    }
    get createEmail() {
        return $('//*[@value="* E-mail"]')
    }
    get createAgeCategory() {
        return $('//XCUIElementTypeApplication[@name="(Dev) Ideme vlakom"]/XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[5]/XCUIElementTypeButton[1]')
    }
    get createDiscountCategory() {
        return $('-ios class chain:**/XCUIElementTypeTextField[`value == "Bez zľavy"`]')
    }
    get createRegistryNumber() {
        return $('//*[@value="Číslo registrácie cestujúceho"]')
    }
    get createRegistryNumberCheckBox() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_local_account_editor_free_transport_available"]')
    }
    get createLocalAccountBtn() {
        return $('//XCUIElementTypeStaticText[@name="Vytvoriť lokálny profil"]')
    }
    get clickOnAccount() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_drawer_header_name"]')
    }
    get removeAccountSelector() {
        return $("//XCUIElementTypeButton[@name='Odstrániť']")
    }
    get signToAccountText() {
        return $('~Prihlásiť do zákazníckeho konta ZSSK ID alebo vytvoriť lokálny profil')
    }
    get errorMsgInvalidEmail() {
        return $('//*[@label="Vyplňte všetky povinné polia"]')
    }
    get errorMsgEmptyEmail() {
        return $('//*[@label="Vyplňte všetky povinné polia"]')
    }
    get errorMsgInvalidName() {
        return $('//*[@label="Vyplňte všetky povinné polia"]')
    }
    get errorMsgEmptyName() {
        return $('//*[@label="Vyplňte všetky povinné polia"]')
    }
    get errorMsgInvalidLastname() {
        return $('//*[@label="Vyplňte všetky povinné polia"]')
    }
    get errorMsgEmptyLastname() {
        return $('//*[@label="Vyplňte všetky povinné polia"]')
    }
    get YesButton() {
        return $('//*[@label="Áno"]')
    }
    get NoButton(){
        return $('//*[@text="NIE"]')
    }
    get userNameInSideBar() {
        return $('//XCUIElementTypeStaticText[3]')
    }
    get userNameInLocalProfil() {
        return $("//XCUIElementTypeStaticText[2]")
    }
    get userNameInProfil(){
        return $('//XCUIElementTypeApplication[@name="(Dev) Ideme vlakom"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeStaticText[1]')
    }
    get emailInLocalProfil() {
        return $('//XCUIElementTypeApplication[@name="(Dev) Ideme vlakom"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeStaticText[7]')
    }
    get discountCategoryInLocalProfil() {
        return $('//XCUIElementTypeApplication[@name="(Dev) Ideme vlakom"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeStaticText[5]')
    }
    get ageCategoryInLocalProfil() {
        return $('//XCUIElementTypeApplication[@name="(Dev) Ideme vlakom"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeStaticText[3]')
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
        return $('~Ste si istý, že chcete odstrániť lokálny profil?')
    }
   

    async fillUserDatainLocalProfile(name, lastname, email, ageCategory, discountCtegory, registryNumber){
        await this.createName.setValue(name)
        await this.createLastName.setValue(lastname)
        await this.createEmail.setValue(email)
        await Swipe.swipeUpWithKeaybord()
        await browser.pause(500)
        await this.createAgeCategory.click()
        await AddPassengerIOS.ageCategorySelect(ageCategory)
        await this.createDiscountCategory.doubleClick()
        await AddPassengerIOS.selectDiscountCategory(discountCtegory)
    
        if(!await registryNumber == ""){
            await this.createRegistryNumber.setValue(registryNumber)
            await this.createRegistryNumberCheckBox.click()
        }
        
        await this.createLocalAccountBtn.doubleClick()

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
        if (await this.createLocalAccountBtn.isDisplayed()) {
            await HomeScreenIOS.navigateUp.click()
        }
        await browser.pause(1000
        )
    }

    async createAccount(name, lastname, email, ageCategory, discountCtegory, registryNumber) {
        await HomeScreenIOS.navPanel.waitForDisplayed({ timeout: 20000 })
        await HomeScreenIOS.navPanel.click()
         if (!await this.signToAccountText.isDisplayed()) {
            await this.removeAccount()
            await HomeScreenIOS.navPanel.waitForDisplayed()
            await HomeScreenIOS.navPanel.click()
        }

        await HomeScreenIOS.createAccount.waitForDisplayed()
        await HomeScreenIOS.createAccount.click()
        await this.loginButtonZSSKID.waitForDisplayed()
        while (!await this.createLocalAccountBtn.isDisplayed()) {
            await Swipe.swipeUpAllScreen()
        }
        await this.fillUserDatainLocalProfile(name, lastname, email, ageCategory, discountCtegory, registryNumber)      
    } 

    async chceckDataAccountUser(userName, ageCategory, discountCategory, email, registryNumber){
        if(!await this.userNameInLocalProfil.isDisplayed()){
            await HomeScreenIOS.navPanel.waitForDisplayed({ timeout: 20000 })
            await HomeScreenIOS.navPanel.click()
            await expect(this.userNameInSideBar).toHaveText(userName)
        }

        await expect(HomeScreenIOS.userName).toHaveText(userName)
        await HomeScreenIOS.userName.click()
        await this.userNameInProfil.waitForDisplayed({ timeout: 20000 })
        await expect(this.userNameInProfil).toHaveText(userName) 
        await expect(this.discountCategoryInLocalProfil).toHaveText(discountCategory) 
        await expect(this.emailInLocalProfil).toHaveText(email) 
        if(!await registryNumber == ""){
            await expect(this.registryNumberInLocalProfil).toHaveText(registryNumber)
            }
        await HomeScreenIOS.navPanel.click()
    }

    //---- TO DO ----
    async editUserInLocalProfile(name, lastname, email, ageCategory, discountCtegory, registryNumber){
        if(!await this.userNameInLocalProfil.isDisplayed()){
            await HomeScreenIOS.navPanel.waitForDisplayed({ timeout: 20000 })
            await HomeScreenIOS.navPanel.click()
        
        await HomeScreenIOS.userName.click()
    }
        await this.editAccount.click()
        await this.fillUserDatainLocalProfile(name, lastname, email, ageCategory, discountCtegory, registryNumber)
    }

    async removeAccount() {
        if(!(await this.userNameInLocalProfil.isDisplayed() || await this.userNameInSideBar.isDisplayed())){
            await HomeScreenIOS.navPanel.waitForDisplayed({ timeout: 20000 })
            await HomeScreenIOS.navPanel.click()
    }
        if(!await this.signToAccountText.isDisplayed()){
            await HomeScreenIOS.userName.click()
            await this.removeAccountSelector.waitForDisplayed()
            await this.removeAccountSelector.click()
            expect(await this.messageAlertIfDeleteAccount).toBeDisplayed()
            await this.YesButton.click()

            /* await HomeScreenIOS.navPanel.waitForDisplayed()
            await HomeScreenIOS.navPanel.click() */
            expect(await this.signToAccountText).toBeDisplayed()
            await HomeScreenIOS.buyTicket.click()
        }
        else{
            await HomeScreenIOS.buyTicket.click()
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