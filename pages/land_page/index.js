// pages/land_page/land_page.js
let {
  wxGetData
} = require("../../utils/require.js")
import WXP from '../../utils/wxp.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // WXP.login().then(res => {
    //   wxGetData({
    //     url: "http://m69wyp.natappfree.cc/api/xcxLogin",
    //     data: {
    //       code: res.code
    //     },
    //     method: "GET",
    //     isMock: true
    //   }).then(res => {
    //     console.log(res)
    //     if (res.statusCode == '200') {
    //       console.log(res.data);
    //     }
    //   })
    // })
    // return
    //   wxGetData({
    //     url: "http://63wgss.natappfree.cc/api/member/addComplain",
    //     data: {
    //       complaintsType: "",
    //       content: "123",
    //       hotelName: ""
    //     },
    //     method: "POST",
    //     isMock: true
    //   }).then(res => {
    //     if (res.statusCode == '200') {
    //       console.log(res.data);
    //     }
    //   })
    // return
    // 查看是否授权
    // wx.getSetting({
    //   success: function (res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res.userInfo)
    //           //用户已经授权过
    //         }
    //       })
    //     }
    //   }
    // })
  },

  getPhoneNumber: function(e) {
    console.log(e)
    if (e.detail.errMsg === 'getPhoneNumber:ok') { //用户同意授权
      this.setData({
        phoneInfo: e.detail
      })
      this.login()
    } else { //用户拒绝授权
      console.log(199)
      return;
      //用户按了拒绝按钮
    }
  },
  login: function(e) {
    let that = this
    WXP.login().then(res => {
      console.log(this.data.phoneInfo)
      wx.request({
        url: 'http://bgy.h-world.com/api/weixin/xcxLogin', //登录接
        data: {
          code: res.code,
          encryptedData: this.data.phoneInfo.encryptedData,
          iv: this.data.phoneInfo.iv
        },
        method:'POST',
        success: function(res) {
          console.log(res)
          if (res.data.code != '0') {
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '无法登录，请重试',
              showCancel: false
            })
            return;
          }
          let userInfo = res.data.data.member
          wx.setStorageSync('token', res.data.data.ccess_token)
          wx.setStorageSync('userInfo',userInfo)
          // 回到原来的页面
          wx.navigateBack();
        }
      })
    })
  },
  registerUser: function() { //注册
    let that = this;
    let phoneInfo = this.data.phoneInfo
    WXP.login().then(res => {
      let prams = {
        code: res.code,
        encryptedData: phoneInfo.encryptedData,
        iv: phoneInfo.iv
      }
      wxGetData({
        url: 'https://api.it120.cc/shopmall/user/wxapp/register/complex',
        data: prams, // 设置请求的 参数
        isMock: true,
        success: (res) => {
          console.log(res)
          wx.hideLoading();
          that.login();
        }
      })
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

  },
  //手机号码登录
  phoneNumber: function() {
    wx.navigateTo({
      url: "../phone_page/phone_page",
    })
  },
  //微信授权登录

})