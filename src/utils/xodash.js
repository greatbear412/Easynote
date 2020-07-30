export const slimObject = function (obj, keys) {
  return keys ? JSON.parse(JSON.stringify(obj, function (key, value) {
    if (keys.includes(key)) {
      return undefined
    } else {
      return value
    }
  })) : obj
}
