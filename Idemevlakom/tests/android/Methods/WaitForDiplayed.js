class WaitFor{
    get progressBar(){
        return $('//*[@resource-id="sk.zssk.mobapp.android.dev:id/a_order_pricing_loader_item_progressBar"]')
    }

    async waitForDisplayedFunction(){
        if(await this.progressBar.isDisplayed()){
            await browser.pause()
        }
    }

}