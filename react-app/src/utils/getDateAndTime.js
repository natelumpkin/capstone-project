const getDateAndTime = (dateString) => {
  let postTime = new Date(dateString)
  let date = new Intl.DateTimeFormat('en-US',{month: 'short', day: 'numeric', year: 'numeric'}).format(postTime)
  let time = postTime.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false})
  return date + ' at ' + time
}

export default getDateAndTime;
