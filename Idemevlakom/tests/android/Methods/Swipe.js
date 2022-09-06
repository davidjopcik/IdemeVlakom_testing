import getWindowSize from "webdriverio/build/commands/browser/getWindowSize"

class Swipe {
    async swipeUp() {
        browser.touchPerform([
            {
                action: 'press',
                options: {
                    x: 500,
                    y: 1600
                }
            },
            {
                action: 'wait',
                options: {
                    ms: 300
                }
            },

            {
                action: 'moveTo',
                options: {
                    x: 500,
                    y: 1100
                }
            },

            {
                action: 'release',
                options: {
                }
            },

        ])
    }

    async swipeToLeft() {
        browser.touchPerform([
            {
                action: 'press',
                options: {
                    x: 850,
                    y: 1100
                }
            },
            {
                action: 'wait',
                options: {
                    ms: 300
                }
            },

            {
                action: 'moveTo',
                options: {
                    x: 150,
                    y: 1100
                }
            },

            {
                action: 'release',
                options: {
                }
            },

        ])
    }

    async swipeUpAllScreen() {

        const swipeFrom = (await browser.getWindowSize()).height * 0.8
        const swipeTo = (await browser.getWindowSize()).height * 0.55
        const anchor = (await browser.getWindowSize()).width * 0.5


        console.log("--------------- " + swipeFrom);
        console.log("--------------- " + swipeTo);
        console.log("--------------- " + anchor);


        driver.touchPerform([
            {
                action: 'press',
                options: { x: anchor, y: swipeFrom }
            },
            {
                action: 'wait',
                options: {
                    ms: 300
                }
            },

            {
                action: 'moveTo',
                options: { x: anchor, y: swipeTo }


            },

            {
                action: 'release',
                options: {
                }
            },

        ])
    }

    async swipeUpMin() {

        const swipeFrom = (await browser.getWindowSize()).height * 0.6
        const swipeTo = (await browser.getWindowSize()).height * 0.5
        const anchor = (await browser.getWindowSize()).width * 0.5


        console.log("--------------- " + swipeFrom);
        console.log("--------------- " + swipeTo);
        console.log("--------------- " + anchor);


        driver.touchPerform([
            {
                action: 'press',
                options: { x: anchor, y: swipeFrom }
            },
            {
                action: 'wait',
                options: {
                    ms: 300
                }
            },

            {
                action: 'moveTo',
                options: { x: anchor, y: swipeTo }


            },

            {
                action: 'release',
                options: {
                }
            },

        ])
    }

    async swipeDown() {
        browser.touchPerform([
            {
                action: 'press',
                options: {
                    x: 500,
                    y: 1050
                }
            },
            {
                action: 'wait',
                options: {
                    ms: 500
                }
            },

            {
                action: 'moveTo',
                options: {
                    x: 500,
                    y: 1900
                }
            },

            {
                action: 'release',
                options: {
                }
            },

        ])
    }

    async swipeElement0nTop(element) {

        const elementYLocation = await element.getLocation('y')
        console.log("------------------- " + elementYLocation);
        let swipeTime = 2500
        if (elementYLocation > 900) {
            swipeTime = 4000
        }
        else if (elementYLocation < 500) {
            swipeTime = 1000
        }
        console.log("-------------------- " + swipeTime);

        if((elementYLocation < 250) && (elementYLocation > 80)){
        return
        }

        
        await element.touchAction([
            'press',
            { action: 'wait', ms: swipeTime },
            { action: "moveTo", x: 0, y: - elementYLocation + 150 },
            'release'
        ])
    
    }
    async swipeElement0nTopActualWay(element) {
        const elementYLocation = await element.getLocation('y')
        console.log("------------------- " + elementYLocation);
        let swipeTime = 2500
        if (elementYLocation > 900) {
            swipeTime = 4000
        }
        else if (elementYLocation < 500) {
            swipeTime = 1000
        }
        console.log("-------------------- " + swipeTime);

        if ((elementYLocation < 350) && (elementYLocation > 200)) {
        return
        }

            await element.touchAction([
                'press',
                { action: 'wait', ms: swipeTime },
                { action: "moveTo", x: 0, y: - elementYLocation + 270 },
                'release'
            ])
        
    }

    async swipeByUiSelector() {
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1,5)')
    }


}

export default new Swipe()