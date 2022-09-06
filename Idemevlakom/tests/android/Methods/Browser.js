class BrowserFinfElemnets{
    get urlBar(){
        return $('//*[@resource-id="com.android.chrome:id/url_bar"]')
    }
    get loginIkvcDialog(){
        return  $('//*[@resource-id="com.android.chrome:id/alertTitle" and contain(@text, "Prihlásiť sa")]')
    }
    get loginIkvcDialogUserName(){
        return $('//*[@resource-id="com.android.chrome:id/username"]')
    }



    async findInBrowser(url){
        await this.urlBar.click()
        await this.urlBar.setValue(url)
        await driver.pressKeyCode(66)

        browser.pause(5000)

        /*
        if(await this.loginIkvcDialog.isDisplayed()){
            await this.loginIkvcDialogUserName.click()
            await this.loginIkvcDialogUserName.setValue("ikvc")
             await  $('//*[resource-id="com.android.chrome:id/username"]').setValue("ikvc")
            await $('//*[resource-id="com.android.chrome:id/password"]').click()
            await  $('//*[resource-id="com.android.chrome:id/password"]').setValue("ikvc24test")

            await $('//*[resource-id="android:id/button1" and contain(@text, "Prihlásiť sa")]').click()
       }
        */
    
    }

    async SearchFromToInBrowser(from, to){
        //Čas príchodu nastav aktuálny + 2
        let departTime = await $('//*[@resource-id="departTime"]').getText()
        console.log("--------------------------" + departTime);
        let departTimePlus = parseInt(departTime) + 2
        await $('//*[@resource-id="departTime"]').setValue(departTimePlus + ":00")
        browser.hideKeyboard()
        console.log("---------------------------PLUS" + departTimePlus);

        //Vyhľadaj OD - DO
        await $('//*[@resource-id="fromInput"]').setValue(from)
        await $('//*[@resource-id="toInput"]').setValue(to)
        if(!($('//*[@resource-id="fromInput"]')).toHaveText(from)){
            await $('//*[@resource-id="fromInput"]').setValue(from)
        }
        await $('//*[@resource-id="departTime"]').click()
        browser.hideKeyboard()

        //Klik na Vyhľadať
        await $('//*[@resource-id="actionSearchConnectionButton"]').click()
    }

    async SelectSearchedTrainInBrowser(from){
        await $('//*[@text = "'+from+'"]').waitForDisplayed()
        let trainNumberSelector = await $('//*[@class=\"r\"]')
        //let trainNumber = await trainNumberSelector.getText()
        //console.log("------------------------trainnumber " + trainNumber);

        await trainNumberSelector.click()

        await $('//*[@text = "OBSADENOSŤ"]').click()

    }

}
export default new BrowserFinfElemnets()