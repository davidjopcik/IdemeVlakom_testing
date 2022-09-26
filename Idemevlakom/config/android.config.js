import { config } from './test-configIVM';
import { deviceName as _deviceName } from './android.info';
const path = require('path')


config.capabilities = [
    
    {
    // ---- IOS ----
   /*  "appium:platformName": "ios",
    "appium:automationName": "XCUITest", 
    "appium:deviceName": "iPhone 14",
    "appium:app": path.join(process.cwd(), "./Idemevlakom/app/ios/"),  */
    

    // ---- ANDROID ----
    "appium:platformName": "Android",
    "appium:automationName": "UiAutomator2", 
    "apiium:deviceName": _deviceName,
    "appium:maxInstance": 1,
   
    //"appium:platformVersion": "8",
    //"appium:deviceName": "Pixel 4 API Tiramisu",
    //"appium:deviceName": "Android Device",

    //"appium:appPackage": "sk.zssk.mobapp.android.dev",
    //"appium:appActivity": ".MainActivity"

    specs: [

        // ---- LOGIN TESTS -----
        "Idemevlakom/tests/android/testcases/Logins/TC1_LoginLocalUser.js",

        // ---- REGRES TESTS ----
        //'Idemevlakom/tests/android/testcases/Regres_tests/TC_3_1.js',
        /* 'Idemevlakom/tests/android/testcases/Regres_tests/TC_3_2.js',
        'Idemevlakom/tests/android/testcases/Regres_tests/TC_3_3.js',
        'Idemevlakom/tests/android/testcases/MCD/TC_8_1_MCD.js', */


        // ---- MCD Tickets TESTS ----
        //'Idemevlakom/tests/android/testcases/MCD/TC_8_2_MCD.js',

        // ---- Buy Flow ----
        //'Idemevlakom/tests/android/testcases/TC_00_BuyFlow_JEDNORAZOVY.js',
        //'Idemevlakom/tests/android/testcases/TC_01_BuyFlow_TRATOVY.js',

        //'Idemevlakom/tests/android/testcases/Oblubeni_cestujuci/TC_9_1_PridanieOC.js',

        //'Idemevlakom/tests/android/testcases/Bug_tests/test1.js',
        //"Idemevlakom/tests/android/testcases/Logins/TC2_LoginZsskAccount.js",


        //'Idemevlakom/tests/android/testcases/SpecTests/SoldOutBaggage.js',
        //'Idemevlakom/tests/android/testcases/MCD/TC_8_1_MCD.js',
        //'Idemevlakom/tests/android/testcases/MCD/TC_8_2_MCD.js',

        // ---- IOS ----
        //'Idemevlakom/tests/ios/testcases/test.js',







        [
            //'Idemevlakom/tests/android/testcases/Logins/TC1_LoginLocalUser.js',
        ]

    ],

}];

const _config = config;
export { _config as config };