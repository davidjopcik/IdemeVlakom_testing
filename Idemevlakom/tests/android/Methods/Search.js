import HomeScreen from "./HomeScreen"
import SearchResult from "./SearchResult"

class Search {
    get searchFrom() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_assistant_search_form_from"]')
    }
    get searchFromTratovy() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_assistant_line_search_form_from"]')
    }
    get searchToTratovy() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_assistant_line_search_form_to"]')
    }
    get searchToResultTratovy() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_assistant_line_search_form_via"]')
    }
    get searchBtnTratovy() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_assistant_line_search_form_search_button"]')
    }
    get searchTo() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_assistant_search_form_to"]')
    }
    get searchToResult() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_assistant_search_form_date"]')
    }
    get searchBtn() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_assistant_search_form_search_button"]')
    }
    get firstResult() {
        return $("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[2]/android.widget.LinearLayout")
    }
    get secondResult() {
        return $("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[3]/android.widget.LinearLayout")
    }
    get thirdResult() {
        return $("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout[4]/android.widget.LinearLayout")
    }
    get nextBtn() {
        return $("//*[@resource-id='sk.zssk.mobapp.android.dev:id/universal_bottom_navigation_panel_next_wrapper']")
    }
    get emptyStationSnackbar() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/snackbar_text" and contains(@text, "Zadajte" + "stanicu")]')
    }
    get dayFromSelector() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_assistant_search_form_date"]')
    }
    get timeFromSelector() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_assistant_search_form_time"]')
    }
    get plusHourBtn(){
        return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.TimePicker/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.NumberPicker[1]/android.widget.Button[2]')
    }
    get plusMinBtn(){
        return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.TimePicker/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.NumberPicker[2]/android.widget.Button[2]')
    }


    async searchTratovy(from, to, trainType) {
        await HomeScreen.tratovyListok()
        await this.searchFromTratovy.waitForDisplayed({ timeout: 15000 })
        await this.searchFromTratovy.click()

        await this.searchFromTratovy.setValue(from)
        await browser.pause(1000)
        await this.searchToTratovy.click()

        //Zadanie cieľovej stanice
        await this.searchToTratovy.click()
        await this.searchToTratovy.setValue(to)
        await browser.pause(1000)
        await this.searchToResultTratovy.click()

        //Kliknutie na hľadať
        await this.searchBtnTratovy.click()

        // //Ak nenašiel stanicu a zobrazil sa snackbar
        if (!await SearchResult.searchResultSumaryTratovy.isDisplayed()) {
            await this.searchTratovy(from, to, trainType)
        }
        else {
            await SearchResult.searchResultSumaryTratovy.waitForDisplayed({ timeout: 20000 })
        }
    }

    async search(from, to, hours) {
        //Zadanie nástupnej stanice
        await this.searchFrom.waitForDisplayed({ timeout: 15000 })
        await this.searchFrom.click()
        await this.searchFrom.setValue(from)
        await browser.pause(1000)
        await this.searchTo.click()

        //Zadanie cieľovej stanice
        await this.searchTo.click()
        await this.searchTo.setValue(to)
        await browser.pause(1000)
        await this.searchToResult.click()

        //Čas odchodu
        console.log("------------------" + hours);
        if (hours !== (0 || undefined)) {
            await this.changeDepartureTime(hours)
        }

        //Kliknutie na hľadať
        await this.searchBtn.click()
    }
    //Nastav čas odchodu/príchodu na(presný čas)
    async setDepartureTime(Hours){
        await this.timeFromSelector.click()
        let TimeFromHours = await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.TimePicker/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.NumberPicker[1]/android.widget.EditText')
        let TimeFromMinsPlus = await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.TimePicker/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.NumberPicker[2]/android.widget.Button[2]')

        await TimeFromHours.setValue(parseInt(await TimeFromHours.getText()) + Hours)
        await TimeFromMinsPlus.click()
        await TimeFromMinsPlus.click()
        await $('//*[@resource-id="android:id/button1"]').click()

        //expect(await this.timeFromSelector.getText()).toEqual(await newTimeFromHours +  ":" + await newTimeFromMins)
    }

    //Nastav čas odchodu vlaku o 
    async changeDepartureTime(plusHours) {
        
        await  this.timeFromSelector.click()
        await $('//*[@text="TERAZ"]').click()
        await  this.timeFromSelector.click()
        for(let i=1; i <= plusHours; i++){
            await this.plusHourBtn.click()
        }
        let TimeFromHours = await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.TimePicker/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.NumberPicker[1]/android.widget.EditText').getText()
        let TimeFromMins = await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.TimePicker/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.NumberPicker[2]/android.widget.EditText').getText()
        
        await $('//*[@resource-id="android:id/button1"]').click()

        expect(await this.timeFromSelector.getText()).toEqual(TimeFromHours +  ":" + TimeFromMins)
    }

}

export default new Search()