class OpenApp {
    async restarteApp() {
        await driver.unlock()
        await driver.terminateApp("sk.zssk.mobapp.android.dev")
        await driver.activateApp("sk.zssk.mobapp.android.dev")
    }
    async openGoogleBrowser(){
        await driver.unlock()
        await driver.terminateApp("com.android.chrome")
        await driver.activateApp("com.android.chrome")
    }
}
export default new OpenApp()