// pages/land_page/land_page.js
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
  onLoad: function (options) {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              //用户已经授权过
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo) {
      wx.setStorageSync('userInfo', e.detail.userInfo)
      console.log(99)
      this.login();
      //用户按了允许授权按钮
    } else {
      console.log(199)
      return;
      //用户按了拒绝按钮
    }
  },
  login: function (e) {
    let that = this
    //已经登录过
    let token = wx.getStorageSync('token');
    if (token) {
      wx.request({
        url: 'https://api.it120.cc/shopmall/user/check-token',//模拟检查token接口
        data: {
          token: token
        },
        success: function (res) {
          if (res.data.code != 0) {
            wx.removeStorageSync('token')
            that.login();
          } else {
            // 回到原来的地方放
            wx.navigateBack();
          }
        }
      })
      return;
    }

    //登录过
    wx.login({
      success: function (res) {
        wx.request({
          url: 'https://api.it120.cc/shopmall/user/wxapp/login',//登录接口
          data: {
            code: res.code
          },
          success: function (res) {
            console.log(res.data.code)
            if (res.data.code == 10000) {
              // 去注册
              that.registerUser();
              return;
            }
            else if (res.data.code != 0) {
              // 登录错误
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '无法登录，请重试',
                showCancel: false
              })
              return;
            }
            wx.setStorageSync('token', res.data.data.token)
            wx.setStorageSync('uid', res.data.data.uid)
            // 回到原来的页面
            wx.navigateBack();
          }
        })
      }
    })
  },
  registerUser:function() {//注册
    let that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            // 下面开始调用注册接口
            wx.request({
              url: 'https://api.it120.cc/shopmall/user/wxapp/register/complex',
              data: { code: code, encryptedData: encryptedData, iv: iv }, // 设置请求的 参数
              success: (res) => {
                wx.hideLoading();
                that.login();
              }
            })
          }
        })
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
  //手机号码登录
  phoneNumber:function(){
    wx.navigateTo({
      url: "../phone_page/phone_page",
    })
  },
  //微信授权登录
  
})