class HomeScreen{

    get tratovySelector(){
        return $('~Traťový')
    }
    get navPanel() {
        return $('~Menu')
    }
    get navigateUp(){
        return $('~Prejsť nahor')
    }
    get DrawerTicketCurrent() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/drawer_ticket_current"]')
    }
    get buyTicket() {
        return $('~Nákup lístkov')
    }
    get actualWays() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/design_menu_item_text" and contains(@text, "Aktuálne cesty")]')
    }
    get historyOfWays() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/design_menu_item_text" and contains(@text, "História ciest")]')
    }
    get shoppingCart() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/design_menu_item_text" and contains(@text, "Nákupný košík")]')
    }
    get createAccount() {
        return $('~Vytvorenie konta')
    }
    get settings() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/design_menu_item_text" and contains(@text, "Nastavenia")]')
    }
    get aboutApp() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/design_menu_item_text" and contains(@text, "O aplikácii")]')
    }
    get userName(){
        return $('//XCUIElementTypeApplication[@name="(Dev) Ideme vlakom"]/XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]/XCUIElementTypeStaticText[1]')
    }
  


    async tratovyListok(){
        await this.tratovySelector.waitForDisplayed({timeout: 15000})
        await this.tratovySelector.click()
    }

}


export default new HomeScreen() 