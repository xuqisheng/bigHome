// pages/complaint_page/complaint_page.js


var that
var list = []

Page({
  /**
   * 页面的初始数据
   */
  data: {
    min: 15, //最少字数
    max: 150, //最多字数 (根据自己需求改变) 
    array: ['请选择', '预约看房', '租客维修', '租客保洁'],
    showRoomPicker: false, //设置data-picker默认为false,
    imgbox: '',
    multiIndex: [0, 0],
    multiArray: [
      ['东莞市', '深圳市', "上海市"],
      ['碧家国际社区东莞店']
    ],
    objectMultiArray: [{
        "regid": "2",
        "parid": "1",
        "regname": "东莞市",
        "regtype": "1",
        "ageid": "0"
      },
      {
        "regid": "3",
        "parid": "1",
        "regname": "深圳市",
        "regtype": "1",
        "ageid": "0"
      },
      {
        "regid": "4",
        "parid": "1",
        "regname": "上海市",
        "regtype": "1",
        "ageid": "0"
      },
      {
        "regid": "52",
        "parid": "2",
        "regname": "碧家国际社区东莞店",
        "regtype": "2",
        "ageid": "0"
      },
      {
        "regid": "54",
        "parid": "3",
        "regname": "碧家国际社区深圳店",
        "regtype": "2",
        "ageid": "0"
      },
      {
        "regid": "53",
        "parid": "4",
        "regname": "碧家国际社区上海店",
        "regtype": "2",
        "ageid": "0"
      },
    ],

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
  },
  bindMultiPickerChange: function(e) {
    that.setData({
      "multiIndex[0]": e.detail.value[0],
      "multiIndex[1]": e.detail.value[1]
    })
  },
  bindMultiPickerColumnChange: function(e) {
    switch (e.detail.column) {
      case 0:
        list = []
        for (var i = 0; i < that.data.objectMultiArray.length; i++) {
          if (that.data.objectMultiArray[i].parid == that.data.objectMultiArray[e.detail.value].regid) {
            list.push(that.data.objectMultiArray[i].regname)
          }
        }
        that.setData({
          "multiArray[1]": list,
          "multiIndex[0]": e.detail.value,
          "multiIndex[1]": 0
        })

    }
  },
  // 删除照片 &&
  imgDelete1: function(e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  // 上传图片 &&&
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
    var len = parseInt(value.length);

    //最少字数限制
    if (len <= this.data.min)
      this.setData({
        texts: ""
      })
    else if (len > this.data.min)
      this.setData({
        texts: " "
      })

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //点击提交进行判断
})