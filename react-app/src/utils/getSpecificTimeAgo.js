
const getSpecificTimeAgo = (dateString) => {
  let postTime = new Date(dateString);
  const currentTime = new Date();

  let timeBetween = currentTime - postTime;
  // console.log('time between: ', timeBetween)

  // console.log('')
  let oneYear = 31556952000;
  let oneMonth = Math.floor(oneYear / 12);
  let oneDay = 86400000;
  let oneHour = 3600000;
  let oneMinute = 60000;
  let oneSecond = 1000;

  let yearUnit;
  let monthUnit;
  let dayUnit;
  let hourUnit;
  let minuteUnit;
  let secondUnit;

  if (timeBetween <= oneMinute) {
    let seconds = Math.floor(timeBetween / oneSecond)
    seconds === 1 ? secondUnit = 'seconds' : secondUnit = 'seconds'
    return `${seconds} ${secondUnit} ago`
  } else if (timeBetween <= oneHour) {
    let minutes = Math.floor(timeBetween / oneMinute)
    let seconds = Math.floor((timeBetween - (oneMinute * minutes)) / oneSecond)
    seconds === 1 ? secondUnit = 'second' : secondUnit = 'seconds'
    minutes === 1 ? minuteUnit = 'minute' : minuteUnit = 'minutes'
    return `${minutes} ${minuteUnit}, ${seconds} ${secondUnit} ago`
  } else if (timeBetween <= oneDay) {
    let hours = Math.floor(timeBetween / oneHour)
    let minutes = Math.floor((timeBetween - (oneHour * hours)) / oneMinute)
    hours === 1 ? hourUnit = 'hour' : hourUnit = 'hours'
    minutes === 1 ? minuteUnit = 'minute' : minuteUnit = 'minutes'
    return `${hours} ${hourUnit}, ${minutes} ${minuteUnit} ago`
  } else if (timeBetween <= oneMonth) {
    let days = Math.floor(timeBetween / oneDay)
    let hours = Math.floor((timeBetween - (oneDay * days)) / oneHour)
    days === 1 ? dayUnit = 'day' : dayUnit = 'days'
    hours === 1 ? hourUnit = 'hour' : hourUnit = 'hours'
    return `${days} ${dayUnit}, ${hours} ${hourUnit} ago`
  } else if (timeBetween <= oneYear) {
    let months = Math.floor(timeBetween / oneMonth)
    let days = Math.floor((timeBetween - (oneMonth * months)) / oneDay)
    // console.log(months, ' months')
    // console.log(days, ' remaining days')
    months === 1 ? monthUnit = 'month' : monthUnit = 'months'
    days === 1 ? dayUnit = 'day' : dayUnit = 'days'
    return `${months} ${monthUnit}, ${days} ${dayUnit} ago`
  } else {
    let years = Math.floor(timeBetween / oneYear)
    let months = Math.floor((timeBetween - (oneYear * years)) / oneMonth)
    years === 1 ? yearUnit = 'year' : yearUnit = 'years'
    months === 1 ? monthUnit = 'month' : yearUnit = 'years'
    return `${years} ${yearUnit}, ${months} ${monthUnit} ago`
  }




  // if postTime is today, just return today
  // if it's within the year, return "x months ago"
  // if it's within the month, return "x days ago"
  // otherwise, return "x years, x months ago"

  const year = postTime.getFullYear()
  const month = postTime.getMonth()
  const day = postTime.getDate()

  let unit;
  let timeAgo;


  if (year === currentTime.getFullYear() &&
  month === currentTime.getMonth() &&
  day === currentTime.getDate()) {
    return 'today'
  }
  else if (year === currentTime.getFullYear() &&
      month === currentTime.getMonth()) {
        timeAgo = currentTime.getDate() - day
        unit = 'day'
        if (timeAgo > 1) unit = 'days'
      }
  else if (year === currentTime.getFullYear()) {
    timeAgo = currentTime.getMonth() - month
    unit = 'month'
    if (timeAgo > 1) unit = 'months'
  } else {
    let yearsAgo = currentTime.getFullYear() - year
    let monthsAgo = currentTime.getMonth() - month
    if (monthsAgo === 0) {
      return yearsAgo + ' years ago'
    }
    return yearsAgo + ' years, ' + monthsAgo + ' months ago'
  }

  return timeAgo + ' ' + unit + ' ago'
}

// let ex1 = "Wed, 19 Jun 2000 23:16:24 GMT"
// let ex2 = "Thurs, 19 Jun 2022 20:25:20 GMT"
// console.log(getSpecificTimeAgo(ex1))
// console.log(getSpecificTimeAgo(ex2))

// let ex3 =  'Wed, 23 Nov 2022 23:16:24 GMT';
// console.log(getSpecificTimeAgo(ex3))

export default getSpecificTimeAgo;
