const to12HourFormat = (timeString) => {
    let timeArr = timeString.split(":")
    if (parseInt(timeArr[0]) > 12) {
        timeArr[0] = parseInt(timeArr[0]) - 12
        return `${timeArr[0]}:${timeArr[1]} pm`
    } else {
        return `${timeArr[0]}:${timeArr[1]} am`
    }
}


module.exports = to12HourFormat;