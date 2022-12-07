export const config = {

    runner: "local",
    port: 4723,
    //services: ['appium'],
    path: "/wd/hub",
    host: "localhost",
    loglevel: "info",
    framework: "mocha",
    mochaOpts:{
        ui: "bdd",
        requires: ["@babel/register"],
        timeout: "000",
    },
    waitforTimeout: 5000,
    maxInstances:10,

    specs: [
       
        //'Idemevlakom/tests/android/testcases/Bug_tests/TC_100_generovanie_dokladov.js',
        //'Idemevlakom/tests/android/testcases/Regres_tests/TC_0_BuyFlow_TRATOVY',
        
    ],


    capabilities: [{
        "platformName": "Android",
        //"appium:platformVersion": "8",
       //"appium:deviceName": "Android Device",
        "appium:deviceName": "Pixel 4 API Tiramisu",

        "appium:automationName": "UiAutomator2",
        //"appium:appPackage": "sk.zssk.mobapp.android.dev",
        //"appium:appActivity": ".MainActivity"

    }],
      reporters: [
        'spec', [
            'allure', {
                outputDir: './reports/allure/allure-results'
            }
        ], [
            'json', {
                outputDir: './reports/json/json-results'
            }
        ]
    ],
}
