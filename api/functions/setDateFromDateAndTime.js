const setDateTimeFromDateAndTime = (date, time, beforeTime) => {
        let dateTime = new Date(date)
        let hoursArray = time.split(":")
        if (beforeTime) {
                let beforeHoursArray = beforeTime.split(":")
                let endTimeCheck = parseInt(hoursArray[0] + hoursArray[1])
                let beforeTimeCheck = parseInt(beforeHoursArray[0] + beforeHoursArray[1])
                if (beforeTimeCheck > endTimeCheck) {
                        dateTime.setDate(date.getDate() + 1);
                }
        }
        dateTime.setHours(hoursArray[0], hoursArray[1], hoursArray[2])
        return dateTime
}


module.exports = setDateTimeFromDateAndTime;