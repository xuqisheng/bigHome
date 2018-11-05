var app = getApp();
var that = this;
Page({
  data: {
    addr: '',
    swiper: {
      // banner
      imgUrls: [{
        imgs: "../images/1.png",
        title: "合租、整租分散式房源",
      },
      {
        imgs: "../images/7.png",
        title: "￥2900/月起",
      },
      {
        imgs: "../images/1.png",
        title: "￥2090/月起",
      },
      ],
      indicatorDotss: true, //是否显示面板指示点
      autoplayss: true, //是否自动切换
      intervals: 3000, //自动切换时间间隔,3s
      durations: 1000, //  滑动动画时长1s
      current: 0,
      showModal: false, //弹窗默认隐藏
      userName: null,
    },
  },
  onLoad() {
    let that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {//没设置定位去授权定位
          // that.setData({
          //   showModal: true
          // })
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) {
              wx.getLocation({
                type: 'wgs84',
                success(res) {
                  console.log(res)
                },
                fail(res) {
                  console.log(res)
                }
              })
            },
            fail(res) {
              console.log(res)
            }
          })
          //展示弹框
        } else {//没授权
          wx.getLocation({
            type: 'wgs84',
            success(res) {
              console.log(res)
            },
            fail(res) {
              console.log(res)
            }
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  userNameInput: function (e) {
    this.setData({
      addr: e.detail.value
    })
  },
  look: function (e) {
    if (this.data.addr == undefined || this.data.addr == '') {
      wx.showModal({
        title: '提示',
        content: '请选择地理位置'
      })
    } else if (this.data.addr != undefined) {
      wx.navigateTo({
        url: '../my_page/my_page',
      })
    }
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  //允许
  yes: function () {
    this.setData({
      showModal: false
    })
    wx.authorize({
      scope: 'scope.userLocation',
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(999)
      }
    })

    // var that = this;
    // app.getPermission(that);
    // this.setData({
    //   showModal: false
    // })
  },
  // 首页图片展示轮播箭头
  prevImg: function () {
    var swiper = this.data.swiper;
    var current = swiper.current;
    swiper.current = current > 0 ? current - 1 : swiper.imgUrls.length - 1;
    this.setData({
      swiper: swiper,
    })
  },
  // 首页图片展示轮播箭头
  nextImg: function () {
    console.log(2);
    var swiper = this.data.swiper;
    var current = swiper.current;
    swiper.current = current < (swiper.imgUrls.length - 1) ? current + 1 : 0;
    this.setData({
      swiper: swiper,
    })
  },
  //跳转我的页面
  my: function () {
    wx.navigateTo({
      url: "../my_page/my_page"
    });
  },
  //开启定位跳转至地图
  location: function () {
    if (this.data.alearyAddr) {
      app.getPermission(this);
    } else {
      this.setData({
        showModal: true
      })
    }
  },
  //不允许
  no: function () {
    this.setData({
      showModal: false
    })
  },
  //更多房源
  housingResources: function () {
    wx.navigateTo({
      url: '../housingResources_page/housingResources_page',
    })
  },
  //更多房型
  houseType: function () {
    wx.navigateTo({
      url: '../houseType_page/houseType_page',
    })
  }
})