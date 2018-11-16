// pages/complaint_page/complaint_page.js
var rq = require("../../utils/require.js")

var that
var list = []

Page({
  data: {
    min: 15, //最少字数
    max: 150, //最多字数 (根据自己需求改变) 
    array: ['预约看房', '租客维修', '租客保洁'],
    xuanZe: true,
    showRoomPicker: false, //设置data-picker默认为false,
    imgbox: '',
    len: "", //问题描述输入长度
    problemStore: [], //选择问题门店的数据
    roomType: null,
    showRoomValue: 0,
    showRoomValue1: 0,
    showRoomTypePicker: 0,
    roomTypes: [], //房型
  },
  showRt: function (e) {
    this.setData({
      showRoomTypePicker: 1,
      showRoomValue1: 1
    })
  },
  closeRt: function (e) {
    this.setData({
      showRoomTypePicker: 0,
      showRoomValue1: 0
    })
  },
  confirmRT: function (e) {
    this.setData({
      showRoomTypePicker: 0,
      showRoomValue: 1,
      showRoomValue1: 0
    })
  },
  chooseType: function (e) {
    var index = e.detail.value
    this.setData({
      roomType: this.data.roomTypes[index[0]],
      roomTypeValue: [index[0]]
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    rq.wxGetData({
      url: "http://yuj6n7.natappfree.cc/api/member/getHotels",
      data: {},
      method: "POST",
      isMock: true
    }).then(res => {
      if (res.statusCode == '200') {
        this.setData({
          roomTypes: res.data
        })
        console.log(this.data.roomTypes)
      }
    })
  },
  // 上传图片
  addPic1: function(e) {
    var imgbox = this.data.imgbox;
    console.log(imgbox)
    var picid = e.currentTarget.dataset.pic;
    console.log(picid)
    var that = this;
    var n = 6;
    if (6 > imgbox.length > 0) {
      n = 6 - imgbox.length;
    } else if (imgbox.length == 9) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        var tempFilesSize = res.tempFiles[0].size; //获取图片大小,单位B
        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (6 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);

        } //判断图片大小是否大于3M，大于3M弹出框提醒
        else if (tempFilesSize <= 3000000) {
          var tempFilePaths = res.tempFilePaths[0]; //获取图片
          that.data.imgbox.push(tempFilePaths); //添加到数组
          that.setData({
            imgbox: that.data.imgbox
          })
        } else {
          imgbox[picid] = tempFilePaths[0];
          wx.showToast({
            title: '上传图片不能大于3M!', //标题
            icon: 'none' //图标 none不使用图标，详情看官方文档
          })
        }
        that.setData({
          imgbox: imgbox
        });
      }
    })
  },
  // 删除照片
  imgDelete1: function(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
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
  //字数限制  
  inputs: function(e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    this.setData({
      len: parseInt(value.length)
    })

    //最少字数限制
    if (this.data.len <= this.data.min)
      this.setData({
        texts: ""
      })
    else if (this.data.len > this.data.min)
      this.setData({
        texts: " "
      })

    //最多字数限制
    if (this.data.len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: this.data.len //当前字数  
    });
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value,
      xuanZe: false
    })
  },
  submits: function() {
    if (this.data.len < 15) {
      wx.showToast({
        title: '问题描述过短!',
        icon: 'success',
        duration: 1500
      })
    }
  }
})