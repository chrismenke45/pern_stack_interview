const to12HourFormat = (timeString) => {
    //this puts time from sting in 23:30:14 format to 11:30 pm
    let timeArr = timeString.split(":")
    if (parseInt(timeArr[0]) > 12) {
        timeArr[0] = parseInt(timeArr[0]) - 12
        return `${timeArr[0]}:${timeArr[1]} pm`
    } else {
        return `${timeArr[0]}:${timeArr[1]} am`
    }
}

module.exports = to12HourFormat;