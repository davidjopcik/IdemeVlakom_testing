class OpenApp {
    async restarteApp() {
        await driver.unlock()
        await driver.terminateApp("sk.zssk.mobapp.dev.ios")
        await driver.activateApp("sk.zssk.mobapp.dev.ios")
    }
    async openGoogleBrowser(){
        await driver.unlock()
        await driver.terminateApp("com.android.chrome")
        await driver.activateApp("com.android.chrome")
    }
}
export default new OpenApp()