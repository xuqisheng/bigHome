// pages/phone_page/phone_page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGet: false,
    sec: 59

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //刚进入页面随机先获取一个
    this.createCode()

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
  huanyizhang() {
    this.createCode()
  },
  createCode() {
    var code;
    //首先默认code为空字符串
    code = '';
    //设置长度，这里看需求，我这里设置了4
    var codeLength = 4;
    //设置随机字符
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    //循环codeLength 我设置的4就是循环4次
    for (var i = 0; i < codeLength; i++) {
      //设置随机数范围,这设置为0 ~ 36
      var index = Math.floor(Math.random() * 36);
      //字符串拼接 将每次随机的字符 进行拼接
      code += random[index];
    }
    //将拼接好的字符串赋值给展示的code
    this.setData({
      code: code
    })
  },
  fork:function(){
    wx.navigateTo({
      url: '../land_page/index',
    })
  },
  //验证码
  getCode() {
    var self = this
    self.setData({ isGet: true })
    var remain = 59;
    var time = setInterval(function () {
      if (remain == 1) {
        clearInterval(time)
        self.setData({
          sec: 59,
          isGet: false
        })
        return false
      }
      remain--;
      self.setData({
        sec: remain
      })
    }, 1000)
  },
  //登录
  land:function(){
    wx.navigateTo({
      url: '../my_page/my_page',
    })
  },
  
})