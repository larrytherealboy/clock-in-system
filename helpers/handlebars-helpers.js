// 樣板引擎裡的邏輯工具
const dayjs = require('dayjs')
const moment = require('moment')
const relativeTime = require('dayjs/plugin/relativeTime') // 增加這裡
dayjs.extend(relativeTime) // 增加這裡

module.exports = {
  currentYear: () => dayjs().year(), // 取得當年年份作為 currentYear 的屬性值，並導出
  formatDateTime: function (date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  },
  formatTimeOnly: function (date) {
    return moment(date).format('HH:mm:ss')
  },
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  },
  convertDateToTaipei: function (dateTime) {
    let now = new Date();

    // 獲取現在的時區偏移（以分鐘為單位）
    let currentOffset = now.getTimezoneOffset() * 60 * 1000  // 轉換為毫秒

    // 獲取台北的時區偏移（以分鐘為單位）
    let taipeiOffset = 8 * 60 * 60 * 1000  // 轉換為毫秒

    // 計算現在的時間和台北的時區差異
    let taipeiTime = new Date(dateTime.getTime() + taipeiOffset - currentOffset)

    return taipeiTime
  }
}
