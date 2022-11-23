const normalizeData = (data) => {
  const res = {}
  for (let key in data) {
    res[data[key].id] = data[key]
  }
  return res
}

export default normalizeData;
