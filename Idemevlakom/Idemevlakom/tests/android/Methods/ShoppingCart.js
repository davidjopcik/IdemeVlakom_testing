import Swipe from "./Swipe"
class ShoppingCart {
    get AddWaySelector() {
        return $('//*[@text="PRIDAŤ CESTU"]')
    }
    get createProfilSelector(){
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_shopping_cart_email_wrapper_create_profile"]')
    }
    get emailCollapseButtonSelector(){
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/f_shopping_cart_email_collapse_button"]')

    }

    //PRODAŤ CESTU
    async AddWay(){
        if(await this.createProfilSelector.isDisplayed()){
            await this.emailCollapseButtonSelector.click()
        }
            while(!await this.AddWaySelector.isDisplayed()){
                await Swipe.swipeUp()
            }
            await this.AddWaySelector.click()
        } 
    }

export default new ShoppingCart()