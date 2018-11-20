// pages/storeDetails_page/storeDetails_page.js
var rq = require("../../utils/require.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    drop1:0,
    drop2: 0,
    showAll:false,//过渡蒙版
    showError:false,//请求错误
    id:'',
    house:[],
    markers: [{
      id: 0,
      latitude: 23.086,
      longitude: 112.89,
      width: 33,
      height:46
    }],
    mapShow:false
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
    this.getHotelInfo(this.data.id)
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
  service_drop:function(e){
    let d = !this.data.drop1
    this.setData({
      drop1 : d
    })
  },
  type_drop: function (e) {
    let d = !this.data.drop2
    this.setData({
      drop2: d
    })
  },
  getHotelInfo: function (e) {
    let that = this
    let id = e ? e : 64
    let obj = {
      url: 'http://bgy.h-world.com/api/hotel/getHotelDetail',
      data: {
        hotelId : id
      },
      method: 'POST',
      isMock: true
    }
    rq.wxGetData(obj).then((res) => {
      if (res.statusCode == 200) {
        let la = 'markers[0].latitude'
        let lo = 'markers[0].longitude'
        that.setData({
          house:res.data.data.detail,
          [la]: res.data.data.detail.latitude,
          [lo]: res.data.data.detail.longitude,
          showError: false,
          mapShow:true
        })
        console.log(that.data.house)
        setTimeout(function () {
          that.setData({
            showAll: true
          })
        }, 200)
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
  jumpToHotel:function(e){
    wx.openLocation({
      latitude: this.data.house.latitude,
      longitude: this.data.house.longitude,
      scale: 18,
      name: this.data.house.hotelName,
      address: this.data.house.address
    })
  }
})