import AddPassenger from "./AddPassenger"
import CheckTickets, { trainDataArray } from "./CheckTickets"
import Swipe from "./Swipe"

export let TrainTimeFromArray = []
export let TrainToInSegment

class Assertion{

    async CheckTrainFromInAddPassenger(){
        
        let index = 0
            TrainToInSegment = await $('android=new UiSelector().className("android.widget.LinearLayout").index('+ index +').childSelector(new UiSelector().resourceId("sk.zssk.mobapp.android.dev:id/f_order_trains_item_to"))')
            while(await TrainToInSegment.isExisting()){
                index += 1
                TrainToInSegment = await $('android=new UiSelector().className("android.widget.LinearLayout").index('+ index +').childSelector(new UiSelector().resourceId("sk.zssk.mobapp.android.dev:id/f_order_trains_item_to"))')
                console.log("--------------------- "+index);
                if(!await AddPassenger.routeSchedule.isDisplayed()){
                    await Swipe.swipeUpMin()
                }
            }
            TrainToInSegment = await $('android=new UiSelector().className("android.widget.LinearLayout").index('+ (index -1) +').childSelector(new UiSelector().resourceId("sk.zssk.mobapp.android.dev:id/f_order_trains_item_to"))')

              
            console.log("--------------------- "+index);
            console.log("--------------------- "+ await TrainToInSegment.getText())     
        
    }

    
    
}

export default new Assertion()