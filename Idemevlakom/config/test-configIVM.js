
export const config = {
    runner: "local",
    port: 4723,
    services: [
        ['appium', {
        args:{
            adress: 'localhost',
            port:4723
        },
        logPath: './'
    }],
    ],
    appium: {
        command: 'appium',
        args: {},
    },
    path: "/wd/hub",
    host: "localhost",
    loglevel: "info",
    framework: "mocha",
    mochaOpts:{
        bail: 0,
        ui: "bdd",
        requires: ["@babel/register"],
        timeout: "500000",
    },
    waitforTimeout: 10000,
    maxInstances:1,
    

      reporters: [
        'spec' , [
            'allure', {
                outputDir: './reports/allure/allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
            }
        ], [
            'json', {
                outputDir: './reports/json/json-results'
            }
        ] 
    ],

    /* afterStep: async function (step, scenario, { error, duration, passed }, context) {
        if (error) {
          await browser.takeScreenshot();
        }
      }, */


}
