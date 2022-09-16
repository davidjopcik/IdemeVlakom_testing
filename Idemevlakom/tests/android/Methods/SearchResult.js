import Search, { isResultUp } from "./Search"
import Swipe from "./Swipe"

export let trainTypeName = ""
export let orderTrainName = ""
class SearchResult {

    get text_odchod() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_search_results_item_datetime"]')
    }
    get trainTypeOs() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_search_results_item_train_types" and contains(@text, "Os")]')
    }
    get trainTypeR() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_search_results_item_train_types" and contains(@text, "R ")]')
    }
    get trainTypeEC() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_search_results_item_train_types" and contains(@text, "EC")]')
    }
    get trainTypeEx() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_search_results_item_train_types" and contains(@text, "Ex")]')
    }
    get trainTypeEN() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_search_results_item_train_types" and contains(@text, "EN")]')
    }
    get trainTypeIC() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_search_results_item_train_types" and contains(@text, "IC")]')
    }
    get trainTypeSC() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_search_results_item_train_types" and contains(@text, "SC")]')
    }
    get loadNext() {
        return $('//*[contains(@text, "Načítať nasledujúce výsledky")]')
    }
    get timeEndtoBuyTicket() {
        return $('//*[@text="Čas na zakúpenie cestovného dokladu vypršal"]')
    }
    get searchResultSumary() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_search_results_summary"]')
    }
    get navigateUp() {
        return $('~Prejsť nahor')
    }
    get searchResultSumaryTratovy(){
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_appbar_title"]')

    }

    //Ak nie je zvolený typ vlaku na obrazovke -> hľadanie ďalej
    async SearchResultTrain() {
        await browser.pause(1000)
        if (!await this.loadNext.isDisplayed()) {
            await Swipe.swipeUp()
            return;
        }
        await this.loadNext.click()
    }

    // Výber typu vlaku (R, Os, Ic...)
    async getResult(trainType, from, to) {
        //Ak nenašiel stanicu a zobrazil sa snackbar
        if (!await this.searchResultSumary.isDisplayed()) {
            await Search.search(from, to, trainType)
            isResultUp = false
        }
        else {
            await this.text_odchod.waitForDisplayed({ timeout: 20000 })
        }
       
        trainTypeName = await $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_search_results_item_train_types" and contains(@text, "' + trainType + '")]')
        while (!await trainTypeName.isDisplayed()) {
            await this.SearchResultTrain()
        }

        await trainTypeName.click()

        
        
        
        orderTrainName = await $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_order_trains_train_name" and contains(@text, "' + trainType + '")]')
        await orderTrainName.waitForDisplayed({ timeout: 10000 })

        //Viac ako 3 prestupy
        if(await $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_ticket_not_allowed_message"]').isDisplayed()){
            await this.navigateUp.click()
            await Swipe.swipeUp()
            if(await this.loadNext.isDisplayed()){
                this.loadNext.click()
            }
            await Swipe.swipeUp()
            await this.getResult(trainType)
        }

        //Čas na zakúpenie už vypršal
        if (await this.timeEndtoBuyTicket.isDisplayed()) {
            await this.navigateUp.click()
            await Swipe.swipeUp()
            await this.getResult(trainType)
        }
    }
}

export default new SearchResult()

