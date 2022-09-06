import { default as Functions } from "../Methods/WebFunctions";

describe('Open ebay and buy product', () => {
    
    it.only('open ebay web',async () => {
        await Functions.openUrl("www.ebay.com")
        });

    it.only('should add to input value iphone 8 and search it', async () => {
        await Functions.searchPhone()
      });
    
    
      it.only('should select the item and click on it', async () => { 
        await Functions.selectPhoneType()
      });
    
      it.only('should select from select bar', async () => {
        await Functions.selectPhoneParameters()
      });
    
    
      it('should pay in add card', async () => {
        
        await browser.url("https://cart.payments.ebay.com/");
        expect (await browser).toHaveTitle("Shopping cart (1 item)");
    
      });
    
    
      it('should go to checkout', async () => {
        
        const goToCheckOut = await $('//button[text()="Go to checkout"]');   //div.cartsummary-cta button  
        // '//*[@id="mainContent"]/div/div[4]/div/div[1]'
        await goToCheckOut.click();
        await browser.pause(3000);
    
      });

});