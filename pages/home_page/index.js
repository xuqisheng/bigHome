var rq = require("../../utils/require.js")
var app = getApp();
let { wxGetData } = require("../../utils/require.js")
Page({
  data: {
    addr: '',
    adList: [],//广告列表
    hourselist: [],//房源列表
    typeList: [],//房型列表
    articleList: [],//文章列表
    swiper: {
      // banner
      indicatorDotss: true, //是否显示面板指示点
      autoplayss: true, //是否自动切换
      intervals: 3000, //自动切换时间间隔,3s
      durations: 1000, //  滑动动画时长1s
      current: 0,
      showModal: false, //弹窗默认隐藏
      userName: null,
      currentCity: '',
      placeHolder:'请选择位置',
      showError:false,
    },
  },
  onLoad() {
    this.getLocation()
    this.getData()
  },
  getData:function(){
    var that = this
    let data1 = {
      acId: 101
    }
      this.getDatas(data1, 'cms/getAdByPlace','adList')
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
      success: function (res) {
        let city = res.data.result.address_component.city;
        that.setData({ currentCity: city, placeHolder: city });
        app.globalData.localInfo = res.data.result.address_component
      },
      fail: function () {
        that.setData({ currentCity: "获取定位失败", placeHolder: '获取定位失败' });
      },
    })
  },
  userNameInput: function (e) {
    this.setData({
      addr: e.detail.value
    })
  },
  look: function (e) {
    if (this.data.currentCity == undefined || this.data.currentCity == '') {
      wx.openSetting({
        success: (res) => {
          if (res.authSetting["scope.userLocation"]) {////如果用户重新同意了授权登录
            this.getLocation()
          }
        },
        fail: function (res) {
          console.log(res)
        }
      })
    } else if (typeof (this.data.currentCity) != undefined) {
      let city = this.data.currentCity
      wx.navigateTo({
        url: `../shop_list/index?city=${city}`,
      })
    }
  },
  onFocus: function (e) {
    this.setData({
      placeHolder: ' '
    })
  },
  onBlur: function (e) {
    this.setData({
      placeHolder: this.data.currentCity
    })
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
  nextImg: function () {
    var swiper = this.data.swiper;
    var adlist = this.data.adList;
    var current = swiper.current;
    swiper.current = current > 0 ? current - 1 : adlist.advertsList.length - 1;
    this.setData({
      swiper: swiper,
    })
  },
  // 首页图片展示轮播箭头
  prevImg: function () {
    var swiper = this.data.swiper;
    var adlist = this.data.adList;
    var current = swiper.current;
    swiper.current = current < (adlist.advertsList.length - 1) ? current + 1 : 0;
    this.setData({
      swiper: swiper,
    })
  },
  //跳转我的页面
  my: function () {
    wx.navigateTo({
      url: "../my_page/index"
    });
  },
  //开启定位跳转至地图
  location: function () {
    let city = this.data.currentCity
    wx.navigateTo({
      url: `../select_city/index?city=${city}`
    });
  },
  //不允许
  no: function () {
    this.setData({
      showModal: false
    })
  },
  //请求数据
  getDatas:function(data,url,store){
    let that = this
    let st = that.data[store]
    let obj = {
      url: 'http://ptrzac.natappfree.cc/api/'+url,
      data:data,
      method: 'POST',
      isMock: true
    }
    rq.wxGetData(obj).then((res) => {
      if (res.statusCode == 200) {
        st.toLocaleString()(res.data.data)
        that.setData({
          st
        })
        console.log(that.data.adList)
      } else {
        that.setData({
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
  //更多房源
  housingResources: function () {
    wx.navigateTo({
      url: '../housingResources_page/index',
    })
  },
  //更多房型
  houseType: function () {
    let params = this.data.currentCity
    wx.navigateTo({
      url: '../houseType_page/houseType_page',
    })
  }
})