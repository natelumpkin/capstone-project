
const getSpecificTimeAgo = (dateString) => {
  let postTime = new Date(dateString);
  const currentTime = new Date();

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
