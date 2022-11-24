

const getTimeAgoFromDate = (dateString, updatedString) => {
  let postTime = new Date(dateString)
  const updatedTime = new Date(updatedString)
  const currentTime = new Date()
  const year = postTime.getFullYear()
  const month = postTime.getMonth()
  const day = postTime.getDate()
  const hour = postTime.getHours()
  const minutes = postTime.getMinutes()
  const seconds = postTime.getSeconds()
  // if within the minute, tell seconds ago
  // if within the hour, tell minutes ago
  // if within the day, tell hours ago
  // if more than a day, tell the date as MM DD, YYYY
  // console.log("post Time: ", year, month, day, hour, minutes, seconds)
  // console.log('current time: ', currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds())
  let unit;
  let timeAgo;
  let verb = 'Asked '

  if (postTime !== updatedTime) {
    verb = 'Modified '
    postTime = updatedTime
  }

  // console.log(year === currentTime.getFullYear())
  // console.log(month === currentTime.getMonth())
  // console.log(day === currentTime.getDate())


  // if year, month, day, hour, and minutes are the same, tell seconds ago
  if (year === currentTime.getFullYear() &&
          month === currentTime.getMonth() &&
          day === currentTime.getDate() &&
          hour === currentTime.getHours() &&
          minutes === currentTime.getMinutes()) {
            timeAgo = currentTime.getSeconds() - seconds;
            unit = 'second'
            if (timeAgo > 1) unit = 'seconds'
          }
 // if year, month, day, and hour are the same, tell minutes ago
  else if (year === currentTime.getFullYear() &&
            month === currentTime.getMonth() &&
            day === currentTime.getDate() &&
            hour === currentTime.getHours()) {
              timeAgo = currentTime.getMinutes() - minutes;
              unit = 'minute';
              if (timeAgo > 1) unit = 'minutes'
            }
          // if year, month, and day are the same, tell hours ago
  else if (year === currentTime.getFullYear() &&
            month === currentTime.getMonth() &&
            day === currentTime.getDate()) {
              timeAgo = currentTime.getHours() - hour
              unit = 'hour;'
              if (timeAgo > 1) unit = 'hours';
              // console.log('unit', unit, 'time ago', timeAgo)
            }
  // otherwise, return a day
  else {
    let monthName = new Intl.DateTimeFormat('en-US',{month: 'short', day: 'numeric', year: 'numeric'}).format(postTime)
    return monthName;
  }
  return verb + timeAgo + ' ' + unit + ' ago';
}

// let ex1 = "Wed, 19 Nov 2022 23:16:24 GMT"
// console.log(getTimeAgoFromDate(ex1))
// let ex2 = "Thurs, 24 Nov 2022 20:25:20 GMT"
// console.log(getTimeAgoFromDate(ex2))

export default getTimeAgoFromDate;
