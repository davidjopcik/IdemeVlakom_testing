import { config } from './test-configIVM';
import { deviceName as _deviceName } from './android.info';
const path = require('path')


config.capabilities = [
    
    {
    // ---- IOS ----
    "appium:platformName": "ios",
    "appium:automationName": "XCUITest", 
    "appium:deviceName": "iPhone 14",
    //"appium:app": path.join(process.cwd(), "./Idemevlakom/app/ios/"),  
    "suites": {
        login:[
            'Idemevlakom/tests/ios/testcases/Logins/TC1_LoginLocalUserIOS.js',
        ]
    },
    specs: 
    [
        'Idemevlakom/tests/ios/testcases/Logins/TC1_LoginLocalUserIOS.js',
    ],

}];

const _config = config;
export { _config as config };