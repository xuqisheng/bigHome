var rq = require("../../utils/require.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
       dates:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  wenti: function () {
    console.log(1)
    rq.wxGetData({
      url: "http://py7tuv.natappfree.cc/api/hotel/getHotelList",
      data: {
        cityId:"3101",
        hotelNameLike:"",
        pageNo:1,
        pageSize:10
      },
      method: "POST",
      isMock: true
    }).then(res => {
      if (res.statusCode == '200') {
        console.log(res.data);
      }
    })
  },
})