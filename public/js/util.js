import Vue from 'vue'


Vue.prototype.fenChange = function (num) {
  if (typeof num !== 'number' || isNaN(num)) {
    return null
  }
  return (num / 100).toFixed(2)
}