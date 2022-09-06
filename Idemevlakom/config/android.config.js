import { config } from './test-configIVM';
import { deviceName as _deviceName } from './android.info';


config.capabilities = [{
    platformName: "Android",
    automationName: "UiAutomator2",
    maxInstance: 1,
    deviceName: _deviceName,
    //"appium:platformVersion": "8",
    //"appium:deviceName": "Pixel 4 API Tiramisu",
    //"appium:deviceName": "Android Device",

    //"appium:appPackage": "sk.zssk.mobapp.android.dev",
    //"appium:appActivity": ".MainActivity"

    specs: [

        ///////////REGRES TESTS////////////////
        //'Idemevlakom/tests/android/testcases/Regres_tests/TC_3_1.js',


        //'Idemevlakom/tests/android/testcases/Bug_tests/TC_101_generovanie_dokladov_Tratovy.js',
        //'Idemevlakom/tests/android/testcases/Bug_tests/TC_100_generovanie_dokladov.js',

        //"Idemevlakom/tests/android/testcases/Logins/TC1_LoginLocalUser.js",
        //"Idemevlakom/tests/android/testcases/Logins/TC2_LoginZsskAccount.js",

        //'Idemevlakom/tests/android/testcases/TC_01_BuyFlow_TRATOVY.js',
        //'Idemevlakom/tests/android/testcases/TC_00_BuyFlow_JEDNORAZOVY.js',

        //'Idemevlakom/tests/android/testcases/Oblubeni_cestujuci/TC_9_1_PridanieOC.js',

        //'Idemevlakom/tests/android/testcases/Bug_tests/test1.js',

        //'Idemevlakom/tests/android/testcases/SpecTests/SoldOutBaggage.js',
        'Idemevlakom/tests/android/testcases/MCD/TC_8_1_MCD.js',
        //'Idemevlakom/tests/android/testcases/MCD/TC_8_2_MCD.js',

        




        [
        //'Idemevlakom/tests/android/testcases/Logins/TC1_LoginLocalUser.js',
         ]
        
    ],

}];

const _config = config;
export { _config as config };