
module.exports = {
  formatDate: function (dateTime) {
    let nowDate = new Date(Date.UTC(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate()))

    let datePart = nowDate.toISOString().split('T')[0]
    let date = new Date(datePart)

    return date
  }
}