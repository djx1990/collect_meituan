import Vue from 'vue'

Vue.prototype.expire_str = function (endDate) {
  var date = new Date()
  var y = date.getFullYear()
  var m = date.getMonth()
  var d = date.getDate()
  var array = endDate !== undefined ? endDate.split('-') : ''
  var endTime = new Date(parseInt(array[0]), parseInt(array[1]) - 1, parseInt(array[2]))
  var nowTime = new Date(parseInt(y), parseInt(m), parseInt(d))
  var day = (Number(endTime) - Number(nowTime)) / (1000 * 60 * 60 * 24)
  // if (day <= 3) {
  //   this.isExpireWarn = true
  // }
  return day + 1
}

Vue.prototype.fenChange = function (num) {
  if (typeof num !== 'number' || isNaN(num)) {
    return null
  }
  return (num / 100).toFixed(2)
}