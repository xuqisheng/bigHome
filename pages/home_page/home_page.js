var app = getApp();
var that = this;
let { wxGetData} = require("../../utils/require.js")
Page({
  data: {
    addr: '',
    swiper: {
      // banner
      imgUrls: [{
          imgs: "../../images/home_page/1.png",
          title1: "BIG+碧家深圳东门店",
          title2: "现代居家一居室·A15室",
          title3: "￥2900/月起",
        },
        {
          imgs: "../../images/home_page/7.png",
          title1: "BIG+碧家深圳东门店",
          title2: "现代居家一居室·A15室",
          title3: "￥2900/月起",
        },
        {
          imgs: "../../images/home_page/1.png",
          title1: "BIG+碧家深圳东门店",
          title2: "现代居家一居室·A15室",
          title3: "￥2900/月起",
        },
      ],
      indicatorDotss: true, //是否显示面板指示点
      autoplayss: true, //是否自动切换
      intervals: 3000, //自动切换时间间隔,3s
      durations: 1000, //  滑动动画时长1s
      current: 0,
      showModal: false, //弹窗默认隐藏
      userName: null,
      currentCity: '',
      placeHolder:'请选择位置'
    },
  },
  onLoad() {
    this.getLocation()
  },
  getSetting() { //获取授权信息
    let that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) { //没授权定位先授权定位，已授权定位直接定位
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) {
              that.getLocation()
            },
            fail(res) {
              console.log(res.errMsg)
            }
          })
          //展示弹框
        } else { //没授权
          that.getLocation()
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  getLocation() { //获取定位坐标
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.getLocalName(res)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  getLocalName(loacl) { //获取定位城市
    let that = this
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?key=CTJBZ-6HVH3-2XO32-Y4SSL-MTOWK-KFF4A&location=' + loacl.latitude + ',' + loacl.longitude + '&output=json&get_poi=1',
      data: {},
      isMock: true,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        let city = res.data.result.address_component.city;
        that.setData({ currentCity: city, placeHolder:city });
        app.globalData.localInfo = res.data.result.address_component
      },
      fail: function () {
        that.setData({ currentCity: "获取定位失败", placeHolder:'获取定位失败'});
      },
    })
  },
  userNameInput: function(e) {
    this.setData({
      addr: e.detail.value
    })
  },
  look: function(e) {
    if (this.data.currentCity == undefined || this.data.currentCity == '') {
      wx.openSetting({
        success: (res) => {
          if (res.authSetting["scope.userLocation"]) {////如果用户重新同意了授权登录
            this.getLocation()
          }
        },
        fail: function(res) {
          console.log(res)
        }
      })
    } else if (typeof(this.data.currentCity) != undefined) {
      wx.navigateTo({
        url: '../shop_list/index',
      })
    }
  },
  onFocus:function(e){
    this.setData({
      placeHolder: ''
    })
  },
  onBlur:function(e){
    this.setData({
      placeHolder:this.data.currentCity
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  //允许
  yes: function() {
    this.setData({
      showModal: false
    })
    this.getSetting()
    // wx.authorize({
    //   scope: 'scope.userLocation',
    //   success(res) {
    //     console.log(res)
    //   },
    //   fail(res) {
    //     console.log(999)
    //   }
    // })

    // var that = this;
    // app.getPermission(that);
    // this.setData({
    //   showModal: false
    // })
  },
  // 首页图片展示轮播箭头
  nextImg: function() {
    var swiper = this.data.swiper;
    var current = swiper.current;
    swiper.current = current > 0 ? current - 1 : swiper.imgUrls.length - 1;
    this.setData({
      swiper: swiper,
    })
  },
  // 首页图片展示轮播箭头
  prevImg: function() {
    var swiper = this.data.swiper;
    var current = swiper.current;
    swiper.current = current < (swiper.imgUrls.length - 1) ? current + 1 : 0;
    this.setData({
      swiper: swiper,
    })
  },
  //跳转我的页面
  my: function() {
    wx.navigateTo({
      url: "../my_page/index"
    });
  },
  //开启定位跳转至地图
  location: function() {
    if (this.data.alearyAddr) {
      app.getPermission(this);
    } else {
      this.setData({
        showModal: true
      })
    }
  },
  //不允许
  no: function() {
    this.setData({
      showModal: false
    })
  },
  //更多房源
  housingResources: function() {
    wx.navigateTo({
      url: '../housingResources_page/housingResources_page',
    })
  },
  //更多房型
  houseType: function() {
    wx.navigateTo({
      url: '../houseType_page/houseType_page',
    })
  }
})