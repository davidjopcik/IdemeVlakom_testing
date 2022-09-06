class Functions{

    async openUrl(urlName){
        await browser.url(urlName)
        console.log("---------------- TEST");
    }

    async searchPhone(){
        const input = await $('//*[@id="gh-ac"]');
        const searchBtn = await $('//*[@id="gh-btn"]');
        
        await input.addValue("Apple iPhone 11 64GB/128GB/256GB - ALL COLOURS - UNLOCKED - GOOD CONDITION");
        await searchBtn.click();
    }

    async selectPhoneType(){
        const selectedItem = await $('//*[@class="s-item s-item__pl-on-bottom"]');
        await selectedItem.click();
    }

    async selectPhoneParameters(){
        await browser.url("https://www.ebay.com/itm/334120418970?epid=239093325&hash=item4dcb20fe9a:g:WQ4AAOSwUL1hHjE6&amdata=enc%3AAQAHAAAA4JJbwwfSx7FJp7zkkVdGvMdTLjsXFdRPmDM4Elc0WSv7Sy90YF7JRFRae7qTIGEvp80wZ6MMZAzjLkXV9qm2S3o4Q2%2FIOFe9%2BM%2B70mnqwMm7zFGkU3NIFZg7%2BGtExUcmGe3x7R6ZiBJGedwjqF9PrgxfU%2FRZ3VAzU2TxvMaX55k7tQTJECGdwMkIv%2BvxRdYi92DumbgWNcXVZeiKGZuweC1iuXHjSU4DtHCymtlWubUJB4269iZQgNG7BAvh%2FaOLC8vJjmSrFsuE0Gn3VZB%2ByONqeccBGsZ5pi9S0Fq2ADkI%7Ctkp%3ABFBMsubQ-dhg");
    
        const selectBarStorage = await $('//*[@id="msku-sel-1"]'); 
        await selectBarStorage.click();
        const selectStorageSelectBar = await $('=64GB)');
        await selectStorageSelectBar.click()


        const selectBarColour = await $('//*[@id="msku-sel-2"]'); 
        await selectBarColour.click();
        const selectColorFromSelectBar = await $('*=Gold)');
        await selectColorFromSelectBar.click();


        const addToCard = await $('//*[@id="isCartBtn_btn"]');
        await addToCard.click();
    
    }

}

export default new Functions