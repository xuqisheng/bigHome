// pages/select_city/index.js
let {
  wxGetData
} = require("../../utils/require.js")
import WXP from '../../utils/wxp.js'

class Singer {
  constructor({
    id,
    name
  }) {
    this.id = id
    this.name = name
  }
}
let touchPageY = ''
let startIndex = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList: [{
        title: '定位城市',
        items: [{
            areaId: '',
            name: '定位城市A市'
          },
          {
            areaId: '',
            name: '定位城市AA市'
          },
          {
            areaId: '',
            name: '定位城市AAA市'
          }
        ]
      },
      {
        title: '历史记录',
        items: [{
            areaId: '',
            name: '历史城市A市'
          },
          {
            areaId: '',
            name: '历史城市AA市'
          },
          {
            areaId: '',
            name: '历史城市AAA市'
          }
        ]
      },
      {
        title: 'A',
        items: [{
            areaId: '',
            name: 'A市'
          },
          {
            areaId: '',
            name: 'AA市'
          },
          {
            areaId: '',
            name: 'AAA市'
          }
        ]
      },
      {
        title: 'B',
        items: [{
            areaId: '',
            name: 'B市'
          },
          {
            areaId: '',
            name: 'BB市'
          },
          {
            areaId: '',
            name: 'BBB市'
          }
        ]
      },
      {
        title: 'C',
        items: [{
            areaId: '',
            name: 'C市'
          },
          {
            areaId: '',
            name: 'CC市'
          },
          {
            areaId: '',
            name: 'CCC市'
          }
        ]
      }
    ],
    scrollHeight: '',
    shortcutList: [
      '定位',
      '历史',
      'A',
      'B'
    ],
    toView:''
  },
  scroll(e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.city)
    let that = this
    WXP.getSystemInfo().then(res => {
      this.setData({
        scrollHeight: res.windowHeight,
        currentCity: options.city
      })
      this.getCityData()
    })
  },
  getCityData() {
    wxGetData({
      url: 'https://www.easy-mock.com/mock/5be3ac67ff88a57e78f70a10/mapList/city',
      isMock: true
    }).then(res => {
      let cityData = res.data.data.citys
      console.log(cityData)
      let cityMap = this._normalizeCityList(cityData)
      this.setData({
        cityList: cityMap,
        shortcutList: this._createrShortcutList(cityMap)
      })
      console.log(cityMap)
    })
  },
  onShortcutTouchStart(e) {
    startIndex = this.data.shortcutList.findIndex(item => (
      item.id == e.target.id
    ))
    touchPageY = e.changedTouches[0].pageY
    this._scrollTo(startIndex)
  },
  onShortcutTouchMove(e) {
    console.log(touchPageY)
    let diff = (e.changedTouches[0].pageY - touchPageY)/20 | 0
    let index = parseInt(startIndex) + diff
    this._scrollTo(index)
  },
  onShortcutTouchEnd(e){
    // this.setData({
    //   toView: e.target.id
    // })
  },
  _scrollTo(index) {
    if (!index && index !== 0) {
      return
    }
    if (index < 0) {
      index = 0
    } else if (index > this.data.shortcutList.length - 2) {
      index = this.data.shortcutList.length - 2
    }
    this.setData({
      toView: this.data.shortcutList[index].id
    })
  },
  _createrShortcutList(data) {
    return data.map(item => {
      return {
        title: item.title.substring(0, 2),
        id: item.id
      }
    })
  },
  _normalizeCityList(cityData) {
    let getCurrentCityInfo = wx.getStorageSync('currentCityInfo')
    let map = {
      localCity:{
        title: '定位城市',
        id: 'dw',
        items: [{
          name: getCurrentCityInfo.localCity || '',
          id: getCurrentCityInfo.localCityId || ''
        }]
      },
      historyCity: { //在缓存去取历史记录城市,先写死
        title: '历史记录',
        id:'ls',
        items: this._createrMapHistoryList('dw')
      }
    }

    for (let item of cityData) {
      let k = item.pinyin.charAt(0).toUpperCase()
      if (!map[k]) {
        map[k] = {
          title: k,
          items: [],
          id: k
        }
      }
      map[k].items.push({
        name: item.areaName,
        id: item.areaId
      })
    }
    // 处理成有序列表
    let ret = []
    let history = []
    let local = []
    for (let key in map) {
      let val = map[key]
      if (val.title.match(/[a-zA-Z]/)) {
        ret.push(val)
      } else if (val.title == '历史记录') {
        history.push(val)
      } else if (val.title == '定位城市') {
        local.push(val)
      }
    }
    ret.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    })
    return (local.concat(history)).concat(ret)
  },
  _createrMapHistoryList() {
    let arr = []
    let historyListData = wx.getStorageSync('cityHistoryList')
    if (!historyListData) {
      data = [{
        name: this.data.currentCity,
        id: 'dw'
      }]
    } else {
      arr = wx.getStorageSync('cityHistoryList')
    }
    return arr

    // wx.setStorageSync('cityHistoryList', [{
    //   name: '北京市',
    //   id: 'dw'
    // }, {
    //     name: '北京市',
    //     id: 'dw'
    //   }])
    // let historyListData = wx.getStorageSync('cityHistoryList')
    // let data = []
    // let insertArray = (arr, val, compare, maxLen)=>{
    //   const index = arr.findIndex(compare)
    //   if (index === 0) {
    //     return
    //   }
    //   if (index > 0) {
    //     arr.splice(index, 1)
    //   }
    //   arr.unshift(val)
    //   if (maxLen && arr.length > maxLen) {
    //     arr.pop()
    //   }
    // }
    // insertArray(historyListData, queryId, (item) => {
    //   return item.id === queryId
    // }, 6)
    // console.log(historyListData)
    // wx.setStorageSync('cityHistoryList', historyListData)
    // console.log(wx.getStorageSync('cityHistoryList'))
  },
  goBack(e) {
    let data = e.currentTarget.dataset
    wx.setStorageSync('currentCityInfo', data)
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})