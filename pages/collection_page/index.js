// pages/collection_page/index.js
let rq = require("../../utils/require.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectData()
  },
  getCollectData(){
    rq.wxGetData({
      url: "https://www.easy-mock.com/mock/5bf35fbbcc4d7e6060d04c4d/collection/getMemberCollections",
      data: {},
      method: "GET",
      isMock: true
    }).then((res) => {
      let dataArr = res.data.data.collections
      this.setData({
        houseData: dataArr
      })
    })
  },
  cancelCollect(e) {
    wx.showModal({
      title: '确认取消？',
      content: '你确定取消当前收藏吗',
      success(res) {
        let bizType = e.target.dataset.item.bizType
        let bizId = e.target.dataset.item.bizId
        if (res.confirm) {
          rq.wxGetData({
            url: "https://www.easy-mock.com/mock/5bf35fbbcc4d7e6060d04c4d/collection/getMemberCollections",
            data: {
              bizType,
              bizId
            },
            method: "GET",
            isMock: true
          }).then((res) => {
            if (res.data.statusCode == '200') {
              this.getCollectData()
            }
          })
        }
      }
    })
  },
  getCancel() {
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

  }
})