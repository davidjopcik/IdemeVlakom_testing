import Swipe from "./Swipe"
import SearchResult, { trainTypeName } from "./SearchResult"
import PassengerCategories from "./PassengerCategories"
import TicketSelection from "./TicketSelection"

export let discountCategorySelector

class AddPassenger {
    get routeSchedule(){
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_order_trains_route_schedule_button"]')
    }
    get addPassenger() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_order_passengers_add_next_passenger"]')
    }
    get firstName() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_passenger_first_name"]')
    }
    get lastName() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_passenger_last_name"]')
    }
    get ageCategory() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_passenger_age_category"]')
    }
    get ageCategoryDiscount() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_passenger_age_category_discount"]')
    }
    get passengerRegistrationNumber() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_passenger_registration_number"]')
    }
    get addPassengerBtn() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_passenger_add"]')
    }
    get listok_pre_seba_uz_mam() {
        return $('//*[@text="Lístok pre seba už mám"]')
    }
    get travelersRollUp() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/universal_bottom_navigation_panel_action_text"]')
    }
    get FromToResult() {
        return $('')
    }
    get FromResult() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_order_trains_item_from"]')
    }
    get ToResult() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_order_trains_item_to"]')
    }
    get orderOnlySelector() {
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_order_other_services_only_reservation_checkbox"]')
    }
    get secondTrainExist() {
        return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.ScrollView/android.widget.LinearLayout/androidx.viewpager.widget.ViewPager/androidx.recyclerview.widget.RecyclerView/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[2]/android.view.ViewGroup[2]/android.widget.TextView[6]')
    }
    get freeShippingChceck(){
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_passenger_free_transport_available"]')
    }
    get registrationNumber(){
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_passenger_registration_number"]')

    }

    //PRIDAŤ CESTUJÚCEHO
    async addPassengerName(firstName, lastName, ageCategory, discountCategory, freeShipping, registrationNumber) {
        await TicketSelection.nextBtn_1_3.waitForDisplayed()
        if (await this.travelersRollUp.isDisplayed()) {
            await this.travelersRollUp.click()
        }
        while(await this.travelersRollUp.isDisplayed()){
            await Swipe.swipeUp()
        }
        await this.addPassenger.click()
        await this.firstName.addValue(firstName)
        await this.lastName.addValue(lastName)

        await this.ageCategory.click()
        await this.ageCategorySelect(ageCategory)

        await this.ageCategoryDiscount.click()
        await this.selectDiscountCategory(discountCategory)

        if(freeShipping){
            await this.freeShippingChceck.click()
            await this.registrationNumber.setValue(registrationNumber)
        }

        await this.addPassengerBtn.click()
    }

    //Len doplnkovú službu alebo miestenku
    async orderOnly() {
        Swipe.swipeUp()
        await this.orderOnlySelector.click()
    }

    // Výber Kategórie
    async ageCategorySelect(ageCategory) {

        switch (ageCategory) {
            case "dospely_26_61":
                await PassengerCategories.dospely_26_61.click()
                break;
            case "dieta_0_5":
                await PassengerCategories.dieta_0_5.click()
                break;
            case "dieta_6_15":
                await PassengerCategories.dieta_6_15.click()
                break;
            case "mlady_16_25":
                await PassengerCategories.mlady_16_25.click()
                break;
            case "dospely_62_69":
                await PassengerCategories.dospely_62_69.click()
                break;
            case "dospely_70":
                await PassengerCategories.dospely_70.click()
                break;

            default:
                break;
        }
        //await PassengerCategories.ageCategoryDiscount.click()
    }

    // Výber Zľavovej kategórie
    async selectDiscountCategory(discountCategory){
        discountCategorySelector =  $('//*[@text="'+discountCategory+'"]')
        if(!await discountCategorySelector.isDisplayed()){
            await Swipe.swipeUp()
        }
        await discountCategorySelector.click()

    }

   /*  async discountCategorySelect(discountCategory) {


        
        switch (discountCategory) {
            case "bez_zlavy":
                if (!await .isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.bez_zlavy.click()
                break;

            case "preukaz_pre_dochodcu_do_62":
                if (!await PassengerCategories.preukaz_pre_dochodcu_do_62.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.preukaz_pre_dochodcu_do_62.click()
                break;

            case "KLASIK_RAILPLUS":
                if (!await PassengerCategories.KLASIK_RAILPLUS.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.KLASIK_RAILPLUS.click()
                break;

            case "SENIOR_RAILPLUS":
                if (!await PassengerCategories.SENIOR_RAILPLUS.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.SENIOR_RAILPLUS.click()
                break;

            case "MAXI_KLASIK":
                if (!await PassengerCategories.MAXI_KLASIK.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.MAXI_KLASIK.click()
                break;

            case "preukaz_TZP":
                if (!await PassengerCategories.preukaz_TZP.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.preukaz_TZP.click()
                break;

            case "preukaz_TZP-S":
                if (!await PassengerCategories.preukaz_TZP_S.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.preukaz_TZP_S.click()
                break;

            case "Sprievodca_TZP_S":
                if (!await PassengerCategories.Sprievodca_TZP_S.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.Sprievodca_TZP_S.click()
                break;

            case "zeleznicny_preukaz_SR":
                if (!await PassengerCategories.zeleznicny_preukaz_SR.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await this.zeleznicny_preukaz_SR.click()
                break;

            case "zeleznicny_preukaz_CD":
                if (!await PassengerCategories.zeleznicny_preukaz_CD.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.zeleznicny_preukaz_CD.click()
                break;

            case "drzitel_tratoveho_listka":
                if (!await PassengerCategories.drzitel_tratoveho_listka.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.drzitel_tratoveho_listka.click()
                break;

            case "medzinarodny_listok_interrail":
                if (!await PassengerCategories.medzinarodny_listok_interrail.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.medzinarodny_listok_interrail.click()
                break;

            case "preukaz_pre_obcana_od_62":
                if (!await PassengerCategories.preukaz_pre_obcana_od_62.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.preukaz_pre_obcana_od_62.click()
                break;

            case "preukaz_pre_obcana_od_70":
                if (!await PassengerCategories.preukaz_pre_obcana_od_70.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.preukaz_pre_obcana_od_70.click()
                break;

            case "POHODA":
                if (!await PassengerCategories.pohoda.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.pohoda.click()
                break;

            case "preukaz_pre_ziaka_studenta":
                if (!await PassengerCategories.preukaz_pre_ziaka_studenta.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.preukaz_pre_ziaka_studenta.click()
                break;

            case "ISIC_aktivovany_skolou":
                if (!await PassengerCategories.ISIC_aktivovany_skolou.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.ISIC_aktivovany_skolou.click()
                break;

            case "drzitel_tratoveho_listka_student":
                if (!await PassengerCategories.drzitel_tratoveho_listka_student.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.drzitel_tratoveho_listka_student.click()
                break;

            case "preukaz_pre_dieta_do_16":
                if (!await PassengerCategories.preukaz_pre_dieta_do_16.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.preukaz_pre_dieta_do_16.click()
                break;

            case "junior_railplus":
                if (!await PassengerCategories.junior_railplus.isDisplayed()) {
                    await Swipe.swipeUp()
                }
                await PassengerCategories.junior_railplus.click()
                break;
        }
    } */

}

export default new AddPassenger()