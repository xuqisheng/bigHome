// pages/my_page/my_page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
    let userName = userInfo.uname ? userInfo.uname : userInfo.mobile
    userName = userName ? `${userName.substr(0, 3)} **** ${userName.substr(-4, 4)}` : ''
    this.setData({
      userInfo,
      userName
    })
  },
  logOff() {
    wx.showModal({
      title: '提示',
      content: '请确认是否退出登录',
      success(res) {
        if (res.confirm) {
          wx.setStorageSync('userInfo', '')
          this.setData({
            userInfo: '',
            userName: ''
          })
          this.onLoad()
        }
      }
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
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      that.setData({
        userInfo: userInfo,
      })
    }
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
  //点击返回首页
  homePage: function() {
    wx.navigateTo({
      url: "../home_page/home_page"
    });
  },
  //跳转登录页
  Landfall: function() {
    wx.navigateTo({
      url: "../land_page/index"
    });
  },
  // 跳转卡包详情页
  cardBag: function() {
    wx.navigateTo({
      url: "../cardBag_page/cardBag_page",
    })
  },
  //跳转客服
  customerService: function() {
    wx.navigateTo({
      url: '../service_page/service_page',
    })
  },
  //跳转我的积分
  integral: function() {
    wx.navigateTo({
      url: '../integral_page/integral_page',
    })
  }
})