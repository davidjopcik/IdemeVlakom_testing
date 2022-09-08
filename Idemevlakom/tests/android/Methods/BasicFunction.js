
class BasicFunctions {

    async removeZeroFromStart(item) {
        if (await item.charAt(0) == "0") {
            item = item.substring(1)
        }
        console.log(await item);
        return item
    }

    async date(dateFromTrattovy, validityTime) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let trainTimeDeparture = dateFromTrattovy

        console.log(''+ months[parseInt(trainTimeDeparture.split(".")[1]) - 1] +' '+trainTimeDeparture.split(".")[0]+', '+trainTimeDeparture.split(".")[2]+'');

        let dateFrom = new Date(''+ months[parseInt(trainTimeDeparture.split(".")[1]) - 1] +' '+trainTimeDeparture.split(".")[0]+', '+trainTimeDeparture.split(".")[2]+'');
        let dateTo = new Date(''+ months[parseInt(trainTimeDeparture.split(".")[1]) - 1] +' '+trainTimeDeparture.split(".")[0]+', '+trainTimeDeparture.split(".")[2]+'');

        //let trainTimeValidityTo = dateTo.setDate(dateTo.getDate() + 7)
        let trainTimeValidityTo = dateTo.getDate(dateTo.setDate(dateTo.getDate() + validityTime)) + "." + (dateTo.getUTCMonth()+ 1) + "." + dateTo.getFullYear()
        let trainTimeDepartureDateType = dateFrom.getDate() + "." + (dateFrom.getUTCMonth() + 1) + "." + dateFrom.getFullYear()
        
        let validityDays = trainTimeDepartureDateType + " - " + trainTimeValidityTo
        console.log(validityDays);;
       return validityDays
        

    }

}
export default new BasicFunctions