
class BasicFunctions {

    async removeZeroFromStart(item) {
        if (await item.charAt(0) == "0") {
            item = item.substring(1)
        }
        console.log(await item);
        return item
    }

    async date() {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let trainTimeDeparture = '8.9.2022'
        let MonthSplit = trainTimeDeparture.split(".")
        console.log(MonthSplit);
        console.log(months[trainTimeDeparture.split(".")[0] - 1]);

        const event = new Date(''+months[trainTimeDeparture.split(".")[0] - 1] +' '+trainTimeDeparture.split(".")[1]+', '+trainTimeDeparture.split(".")[2]+'');

        //event.setDate(24);

        console.log(event.getDay() + "." + event.getMonth()+ "." + event.getFullYear());
       
        event.setDate(31);
        console.log(event.getDate());

    }

}
export default new BasicFunctions