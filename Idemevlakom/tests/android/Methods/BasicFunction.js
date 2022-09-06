class BasicFunctions {

    async removeZeroFromStart(item) {
        if (await item.charAt(0) == "0") {
            item = item.substring(1)
        }
        console.log(await item);
        return item
    }

}
export default new BasicFunctions