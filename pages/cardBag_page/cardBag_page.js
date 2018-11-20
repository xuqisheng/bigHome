// pages/cardBag_page/cardBag_page.js
var rq = require("../../utils/require.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected1: false,
    card:[],//卡包数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    rq.wxGetData({
      url: "http://bgy.h-world.com/api/coupons/getMemberCouponCodeList",
      data: {
        couponType:"4",
        pageNo:1,
        pageSize:10,
        status2:"1"
      },
      method: "POST",
      isMock: true
    }).then(res => {
      if (res.statusCode == '200') {
        this.setData({
          card: res.data.data
        })
        console.log(this.data.card)
      }
    })
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
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  }
})