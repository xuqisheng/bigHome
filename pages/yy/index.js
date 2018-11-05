const date = new Date()
const nowYear = date.getFullYear()
const nowMonth = date.getMonth() + 1
const nowDay = date.getDate()
const nowHour = date.getHours() - 1
const nowMinute = date.getMinutes()
let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const hours = []
const minutes = []

// 根据年月 获取当月的总天数
let getDays = function (year, month) {
  if (month === 2) {
    return ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28
  } else {
    return daysInMonth[month - 1]
  }
}
// 根据年月日设置当前月有多少天 并更新年月日数组
let setDate = function (year, month, day, hour, minute, _th) {
  let daysNum = year === nowYear && month === nowMonth ? nowDay : getDays(year, month)
  day = day > daysNum ? 1 : day
  let monthsNum = year === nowYear ? nowMonth : 12
  let years = []
  let months = []
  let days = []
  let yearIdx = 9999
  let monthIdx = 0
  let dayIdx = 0
  let hours = []
  let minutes = []

  // 重新设置年份列表
  for (let i = 1950; i <= nowYear; i++) {
    years.push(i)
  }
  years.map((v, idx) => {
    if (v === year) {
      yearIdx = idx
    }
  })
  // 重新设置月份列表
  for (let i = 1; i <= monthsNum; i++) {
    months.push(i)
  }
  months.map((v, idx) => {
    if (v === month) {
      monthIdx = idx
    }
  })
  // 重新设置日期列表
  for (let i = 1; i <= daysNum; i++) {
    days.push(i)
  }
  days.map((v, idx) => {
    if (v === day) {
      dayIdx = idx
    }
  })
  for (let i = 1; i <= 23; i++) {
    if (i < 10) {
      i = '0' + i
    }
    hours.push(i)
  }
  for (let i = 1; i <= 59; i++) {
    if (i < 10) {
      i = '0' + i
    }
    minutes.push(i)
  }
  _th.setData({
    years: years,//年份列表
    months: months,//月份列表
    days: days,//日期列
    hours: hours,
    minutes: minutes,
    value: [yearIdx, monthIdx, dayIdx, nowHour, nowMinute],
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute
  })
}

Page({
  data: {
    roomType: null,
    years: [],
    year: nowYear,
    months: [],
    month: nowMonth,
    days: [],
    day: nowDay,
    hours: hours,
    hour: nowHour,
    minutes: minutes,
    minute: nowMinute,
    value: [9999, 0, 0, 0, 0],
    dateValue: 0,
    showDatepicker: 0,
    showRoomTypePicker: 0,
    showRoomPicker: 0,
    roomTypes: ['宽敞明亮', '精致简约', '经典舒适'], //房型
    roomType: '宽敞明亮', //选中的房型
    roomTypeValue: '', //将选中的房型赋值给form
    showRoomValue: 0, //显示选中的房型
    roomNames: ['A01', 'A02', 'A03'], //房间号
    roomName: 'A01', //选中的房间
    roomNameValue: '', //将选中的房间赋值给form
    showRoomNameValue: 0, //显示选中的房间
    nameValue: '', //名字
    phone: ''
  },
  onLoad: function () {
    setDate(this.data.year, this.data.month, this.data.day, this.data.hour, this.data.minute, this)
  },
  tabClick: function (e) {

  },
  chooseDate: function (e) {
    const val = e.detail.value
    setDate(this.data.years[val[0]], this.data.months[val[1]], this.data.days[val[2]], this.data.hours[val[3]], this.data.minutes[val[4]], this)
  },
  chooseType: function (e) {
    var index = e.detail.value
    this.setData({
      roomType: this.data.roomTypes[index[0]],
    });
  },
  chooseName: function (e) {
    var index = e.detail.value
    this.setData({
      roomName: this.data.roomNames[index[0]],
    });
  },
  showDp: function (e) {
    this.setData({
      showDatepicker: 1
    })
  },
  closeDp: function (e) {
    this.setData({
      showDatepicker: 0
    })
  },
  confirmDp: function (e) {
    this.setData({
      showDatepicker: 0,
      dateValue: 1
    })
  },
  showRt: function (e) {
    this.setData({
      showRoomTypePicker: 1
    })
  },
  closeRt: function (e) {
    this.setData({
      showRoomTypePicker: 0
    })
  },
  confirmRT: function (e) {
    this.setData({
      roomTypeValue: this.data.roomType,
      showRoomTypePicker: 0,
      showRoomValue: 1
    })
  },
  showR: function (e) {
    this.setData({
      showRoomPicker: 1
    })
  },
  closeR: function (e) {
    this.setData({
      showRoomPicker: 0
    })
  },
  confirmR: function (e) {
    this.setData({
      roomNameValue: this.data.roomName,
      showRoomPicker: 0,
      showRoomNameValue: 1
    })
  },
  getName: function (e) {
    this.setData({
      nameValue: e.detail.value
    })
  },
  getPhone: function (e) {
    phone: e.detail.value
  },
  submitAll: function (e) {
    console.log('穿透了，你点到了！！！！')
  },
});