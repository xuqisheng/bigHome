var rq = require("../../utils/require.js")
var app = getApp();
let {
  wxGetData
} = require("../../utils/require.js")
let imagesHeight =

  Page({
    data: {
      defaultImg: ['../../images/loading.png',
        '../../images/loading.png'
      ],
      addr: '',
      adList: [], //广告列表
      houselist: [], //房源列表
      typeList: [], //房型列表
      serverList: [], //服务列表
      currentCity: '请选择位置',
      currentCityId: '',
      placeHolder: '',
      firstloadMap: true,
      current: 0,
      showModal: false, //弹窗默认隐藏
      userName: null,
      placeHolder: '请选择位置',
      showError: false,
    },
    onLoad() {
      this.getLocation()
      this.getData()
    },
    getData: function() {
      var that = this
      let data1 = {
          acId: 101
        },
        data2 = {
          cityId: 3101,
          recommendType: "H_INDEX_HOTEL"
        },
        data3 = {
          cityId: 3101,
          recommendType: "H_INDEX_ROOMTYPE"
        },
        data4 = {
          cityId: 3101,
          page: 0,
          pageSize: 4,
          recommendType: "A_INDEX_FOOT"
        }
      this.getDatas(data1, 'cms/getAdByPlace', 'adList')
      this.getDatas(data3, 'hotel/getRoomTypeRecommendList', 'typeList')
      this.getDatas(data2, 'hotel/getRoomRecommendList', 'houselist')
      // this.getDatas(data4, 'cms/getHelpCenterRecommendList', 'serverList')
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
          wx.setStorageSync('currentCityInfo', {
            name: city,
            id: '', //TODO
            localCity: city,
            localCityId: ''
          })
          that.setData({
            currentCity: city,
            placeHolder: city,
            currentCityId: '' //TODO
          });
        },
        fail: function() {
          that.setData({
            currentCity: "获取定位失败"
          });
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
            if (res.authSetting["scope.userLocation"]) { ////如果用户重新同意了授权登录
              this.getLocation()
            }
          },
          fail: function(res) {
            console.log(res)
          }
        })
      } else if (typeof(this.data.currentCity) != undefined) {
        let city = this.data.currentCity
        wx.navigateTo({
          url: `../shop_list/index?city=${city}`,
        })
      }
    },
    onFocus: function(e) {
      this.setData({
        currentCity: ' '
      })
    },
    onBlur: function(e) {
      let getCurrentCityInfo = wx.getStorageSync('currentCityInfo')
      this.setData({
        currentCity: this.data.placeHolder
      })
    },
    durationChange: function(e) {
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
    prevImg: function() {
      var cur = this.data.current;
      var adlist = this.data.adList;
      cur = cur > 0 ? cur - 1 : adlist.advertsList.length - 1;
      this.setData({
        current: cur,
      })
    },
    // 首页图片展示轮播箭头
    nextImg: function() {
      var cur = this.data.current;
      var adlist = this.data.adList;
      cur = cur < (adlist.advertsList.length - 1) ? cur + 1 : 0;
      this.setData({
        current: cur,
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
      let city = this.data.currentCity
      wx.navigateTo({
        url: `../select_city/index?city=${city}`
      });
    },
    //不允许
    no: function() {
      this.setData({
        showModal: false
      })
    },
    //请求数据
    getDatas: function(data, url, store) {
      let that = this
      let st = store
      let obj = {
        url: 'http://bgy.h-world.com/api/' + url,
        data: data,
        method: 'POST',
        isMock: true
      }
      rq.wxGetData(obj).then((res) => {
        if (res.statusCode == 200) {
          that.setData({
            [st]: res.data.data
          })
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
    housingResources: function() {
      wx.navigateTo({
        url: '../housingResources_page/index',
      })
    },
    //更多房型
    houseType: function() {
      let params = this.data.currentCity
      wx.navigateTo({
        url: '../houseType_page/houseType_page',
      })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function(e) {
      //首次进入页面，取定位数据，否则取内存
      if (this.data.firstloadMap) {
        this.setData({
          firstloadMap: false
        })
        return
      }
      let getCurrentCityInfo = wx.getStorageSync('currentCityInfo')
      if (getCurrentCityInfo) {
        this.setData({
          currentCity: getCurrentCityInfo.name,
          currentCityId: getCurrentCityInfo.id,
          placeHolder: getCurrentCityInfo.name
        })
      }
    },
    jumoToht: function() {
      console.log(1)
      wx.navigateTo({
        url: '../houseType_page/index',
      })
    },
    jumoTohr: function() {
      console.log(2)
      wx.navigateTo({
        url: '../housingResources_page/index',
      })
    },

  })