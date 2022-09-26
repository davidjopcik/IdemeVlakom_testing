describe('Test', () => {
    it('Test',async () => {
        const selector = 'value == "Odkiaľ"'
        const from = await $(`-ios predicate string:${selector}`)
        await from.click()
        await from.setValue("Čadca")
    });
});