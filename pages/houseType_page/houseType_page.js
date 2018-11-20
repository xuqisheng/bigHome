var rq = require("../../utils/require.js")
var mlist = [
  [-1, -1],
  [-1, 2000],
  [2000, 3500],
  [3500, 5000],
  [5000, -1]
]
var slist = [
  ['price', 1],
  ['price', 2],
  ['distance', 1]
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money_content: 5,
    type_content: 3,
    money: [{
      name: '不限',
      checked: false
    },
    {
      name: '￥2000以下',
      checked: false
    },
    {
      name: '￥2000-￥3500',
      checked: false
    },
    {
      name: '￥3500-￥5000',
      checked: false
    },
    {
      name: '￥5000以上',
      checked: false
    }
    ],
    sort: [{
      name: '价格从低到高',
      checked: false
    },
    {
      name: '价格从高到低',
      checked: false
    },
    {
      name: '距离从近到远',
      checked: false
    }
    ],
    pxopen: false,
    pxshow: false,
    pxopens: false,
    pxshows: false,
    active: true,
    hidden: false,
    shang: true,
    xia: false,
    shangs: true,
    xias: false,
    house: [],
    showAll: false, //等数据渲染完毕再显示dom 
    showData: true,
    showError: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.clearCache() //清空缓存
    this.houseType() //第一次请求数据
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //点击地图搜房跳转
  jtm: function (e) {
    wx.navigateTo({
      url: '../shop_list/index'
    })
  },
  //价格
  money: function (e) {
    if (this.data.pxopen) {
      this.setData({
        pxopen: false,
        pxshow: false,
        active: true,
        hidden: false,
        shang: true,
        xia: false,
        shangs: true,
        xias: false,
      })
    } else {
      this.setData({
        pxopen: true,
        pxshow: false,
        pxopens: false,
        pxshows: true,
        active: false,
        hidden: true,
        shang: false,
        xia: true,
      })
    }
  },
  //排序
  sort: function (e) {
    if (this.data.pxopens) {
      this.setData({
        pxopens: false,
        pxshows: false,
        active: true,
        hidden: false,
        shangs: true,
        xias: false,
        shang: true,
        xia: false,
      })
    } else {
      this.setData({
        pxopens: true,
        pxshows: false,
        pxopen: false,
        pxshow: true,
        active: false,
        hidden: true,
        shangs: false,
        xias: true,
      })
    }
  },
  //清空缓存
  clearCache: function (e) {
    this.setData({
      houseTypes: []
    })
  },
  //请求列表
  houseType: function (p1, p2, s1, s2) {
    let that = this
    let obj = {
      url: 'http://bgy.h-world.com/api/hotel/getRoomTypeByCityList',
      data: {
        // cityId: "4403",
        // recommendType:"H_INDEX_ROOMTYPE",
        // priceFloorLimit: p1,
        // priceUpperLimit: p2,
        // sortKey: s1,
        // sortSeq: s2
        "cityId": "4403",
        "pageSize": 10,
        "pageNo": 1,
        "hotelType": "1",
        "priceUpperLimit": 0,
        "priceFloorLimit": 0,
        "sortKey": "",
        "sortSeq": ""
      },
      method: 'POST',
      isMock: true
    }
    rq.wxGetData(obj).then((res) => {
      if (res.statusCode == 200) {
        that.setData({
          house: res.data,
          showData: true,
          showError: false
        })
        console.log(this.data.house)
        setTimeout(function () {
          that.setData({
            showAll: true
          })
        }, 200)
        if (res.data.data.hotels.length == 0) {
          that.setData({
            showData: false
          })
        }
      } else {
        that.setData({
          showAll: true,
          showError: true
        })
        wx.showToast({
          title: '加载失败！',
          mask: true,
          icon: 'none',
          duration: 1000
        })
      }
    }).catch((errMsg) => {
      that.setData({
        showAll: true,
        showError: true
      })
      wx.showToast({
        title: '加载失败！',
        mask: true,
        icon: 'none',
        duration: 1000
      })
      console.log(errMsg);
    });
  },
  //点击蒙版收起弹窗
  hidtemp: function (e) {
    this.setData({
      pxopen: false,
      pxshow: false,
      active: true,
      hidden: false,
      shang: true,
      xia: false,
      shangs: true,
      xias: false,
      pxopens: false,
      pxshows: false,
      active: true,
      hidden: false,
      shangs: true,
      xias: false,
      shang: true,
      xia: false,
    })
    this.getSortList(this.data.money_content, this.data.type_content)
  },
  //获取排序后的列表
  getSortList: function (m, s) {
    let p1 = m < 5 ? mlist[m][0] : ''
    let p2 = m < 5 ? mlist[m][1] : ''
    let s1 = s < 3 ? slist[s][0] : ''
    let s2 = s < 3 ? slist[s][1] : ''
    this.houseType(p1, p2, s1, s2)
  }
})