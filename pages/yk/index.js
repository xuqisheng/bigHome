var requierjs = require('../../utils/require.js');
var sliderWidth = 45; // 需要设置slider的宽度，用于计算中间位置
var app = getApp()
Page({
  data: {
    tabs: ["全部", "待看房", "已看房", "已取消"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    localInfoBottom: 0,
    showCancelBox:0,
    contactState:2,
    states:['待看房','已看房','已取消'],
    colors: ['#B5B5B5', '#00ADA9','#ff4545']
  },
  onLoad: function () {
    var that = this; 
    var query = wx.createSelectorQuery();
    query.select('#local_info').boundingClientRect()
    query.exec(function (res) {
      that.setData({
        localInfoBottom: res[0].height+5
      });
      console.log(res)
      console.log(that.data.localInfoBottom)
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  ceCancel:function(e){
    this.setData({
      showCancelBox: 0,
      contactState: 2
    })
  },
  caCancel: function (e) {
    this.setData({
      showCancelBox: 0,
    })
    // requierjs.wxGetData()
    // .then((res) => {
    //        console.log(res.data)
    // }).catch((errMsg) => {
    // });
  },
  ceyy:function(e){
    this.setData({
      showCancelBox : 1,
    })
  },
  ccontactState:function(e){
    this.setData({
      contactState:0
    })
  },
  mpc:function(e){
    wx.makePhoneCall({
      phoneNumber: '1340111000' //仅为示例，并非真实的电话号码
    })
  },
  storeNavigation:function(e){
    wx.openLocation({
      latitude: 23.362490,
      longitude: 116.715790,
      scale: 18,
      name: '华乾大厦',
      address: '金平区长平路93号'
    })
  }
});