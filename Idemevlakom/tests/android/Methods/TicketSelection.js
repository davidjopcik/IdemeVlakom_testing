class ClassSelection {
    get nextBtn_1_3() {
        return $("//*[@resource-id='sk.zssk.mobapp.android.dev:id/universal_bottom_navigation_panel_next_icon_text' and contains(@text, 'ĎALEJ (1/3)')]")
    }

    get nextBtn_2_3() {
        return $("//*[@resource-id='sk.zssk.mobapp.android.dev:id/universal_bottom_navigation_panel_next_icon_text' and contains(@text, 'ĎALEJ (2/3)')]")
    }

    get nextBtn_3_3() {
        return $("//*[@resource-id='sk.zssk.mobapp.android.dev:id/universal_bottom_navigation_panel_next_icon_text' and contains(@text, 'VLOŽIŤ DO KOŠÍKA (3/3)')]")
    }

    get toPayIcom() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/universal_bottom_navigation_panel_next_icon_text" and contain(@text, "ZAPLATIŤ")]')
    }
    get TimetoBuyEndErrorSelector(){
        return $('//*[@resource-id="" and contain(@text, "ZAPLATIŤ")]')
    }

    async timetoBuyEndError(){
        if(await this.TimetoBuyEndErrorSelector.isDisplayed()){
            //
            //
            //
        }
    }

}
export default new ClassSelection()