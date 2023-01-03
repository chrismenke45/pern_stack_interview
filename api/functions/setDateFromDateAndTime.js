const setDateTimeFromDateAndTime = (date, time) => {
        let dateTime = new Date(date)
        hoursArray = time.split(":")
        dateTime.setHours(hoursArray[0], hoursArray[1], hoursArray[2])
        return dateTime
}


module.exports = setDateTimeFromDateAndTime;