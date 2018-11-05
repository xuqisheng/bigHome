var sliderWidth = 45; // 需要设置slider的宽度，用于计算中间位置
var app = getApp()
Page({
  data: {
    tabs: ["全部", "待看房", "已看房", "已取消"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    localInfoBottom: 0,
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
  }
});