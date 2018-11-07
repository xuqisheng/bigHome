// pages/storeDetails_page/storeDetails_page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: {
      // banner
      imgUrls: [{
        imgs: "../../images/home_page/1.png",
          title: "合租、整租分散式房源",
        },
        {
          imgs: "../../images/home_page/7.png",
          title: "￥2900/月起",
        },
        {
          imgs: "../../images/home_page/1.png",
          title: "￥2090/月起",
        },
      ]
    },
    swiperCurrent: 0,//获取轮播图的下标,
    current:3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  // 轮播图切换事件
  swiperChange: function (e) {
    console.log(e);
    this.setData({
      swiperCurrent: e.detail.current   //获取当前轮播图片的下标
    })
    console.log(this.data.swiperCurrent);
  },
})