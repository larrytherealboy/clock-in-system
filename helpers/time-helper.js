
module.exports = {
  currentTaipeiTime: function () {
    let now = new Date()
    let taipeiTime = new Date(now.getTime())
    return taipeiTime
  },
  formatDate: function (dateTime) {
    let now = new Date();

    // 獲取現在的時區偏移（以分鐘為單位）
    let currentOffset = now.getTimezoneOffset() * 60 * 1000  // 轉換為毫秒

    // 獲取台北的時區偏移（以分鐘為單位）
    let taipeiOffset = 8 * 60 * 60 * 1000  // 轉換為毫秒

    // 計算現在的時間和台北的時區差異
    let taipeiTime = new Date(dateTime.getTime() + taipeiOffset - currentOffset)

    let nowDate = new Date(taipeiTime.getFullYear(), taipeiTime.getMonth(), taipeiTime.getDate())
    let datePart = nowDate.toISOString().split('T')[0]
    let date = new Date(datePart)
    return date
  }
}