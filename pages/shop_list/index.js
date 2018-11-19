// pages/shop-list/index.js
let {
  wxGetData
} = require("../../utils/require.js")
let markersData = []
let hotelData = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    centerX: '',
    centerY: '',
    hotelInfoMap: [],
    currentHotelId: '',
    currentCity: '',
    currentCityId: '',
    mapCoverShow: false,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    swiperIndex:0
  },

  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    let that = this
    if (e.markerId == this.data.currentHotelId) return
    this.setData({
      currentHotelId: e.markerId
    })
    this.setData({
      markers: this.createMarker(e.markerId)
    })
    this.switchCity(e.markerId) 
  },
  switchCity(id) {
    console.log(this.data.hotelInfoMap)
    let index = this.data.hotelInfoMap.findIndex(item => (item.hotelId == id))
    this.setData({
      swiperIndex: index
    })
  },
  controltap(e) {
    console.log(e.controlId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  /**
   * 初始化
   */
  init() {
    let that = this
    let res = {
      latitude: '22',
      longitude: '222'
    }
    this.comparedMark(res) //比较坐标，用于展示离定位最近的默认坐标
    return
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        let latitude = res.latitude
        let longitude = res.longitude
        this.comparedMark(res) //比较坐标，用于展示离定位最近的默认坐标
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  swiperChange(e) {
    let index = e.detail.current
    let currentMarkersData = markersData[index]
    this.setData({
      centerX: currentMarkersData.latitude,
      centerY: currentMarkersData.longitude,
      markers: this.createMarker(currentMarkersData.hotelId)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
  },
  getMapMarks() {
    let that = this
    wxGetData({
      url: 'http://bgy.h-world.com/api/hotel/getHotelList',
      // url: 'https://www.easy-mock.com/mock/5be3ac67ff88a57e78f70a10/mapList/hotel02',
      data: {
        pageNo: 1,
        pageSize: 10,
        cityId: this.data.currentCityId,
        hotelNameLike: ""
      },
      method: 'POST',
      isMock: true
    }).then(res => {
      if (res.statusCode) {
        markersData = res.data.data.hotels
        that.renderPage()
        //that.getHotelDetail()
      }
    })
  },
  /**
   * 渲染页面
   */
  renderPage() {

    let currentHotelId = markersData[0].hotelId //先默认取第一条ID

    //let currentData = hotelData.find(item => item.id == this.data.currentHotelId)
    this.setData({
      centerX: markersData[0].latitude,
      centerY: markersData[0].longitude,
      markers: this.createMarker(currentHotelId),
      hotelInfoMap: this.createHotelInfoMap()
    })
  },
  getHotelDetail(id) {
    let that = this

    wxGetData({
      url: 'http://bgy.h-world.com/api/hotel/getHotelDetail',
      // url: 'https://www.easy-mock.com/mock/5be3ac67ff88a57e78f70a10/mapList/hotelDetail',
      data: {
        hotelId: markersData[0].hotelId
      },
      method: 'POST',
      isMock: true
    }).then(res => {
      console.log(res)
      if (res.statusCode == '200') {
        console.log(22)
        console.log(res)
        hotelData = res.data.data.detail
        that.renderPage()
      }
    })
  },

  /**
   * 处理酒店标识
   */
  createMarker: function(id) {
    let markers = []
    for (let item of markersData) {
      item.clickStatus = false
      if (item.hotelId == id) {
        item.clickStatus = true
      }
      let marker = this.markerClass(item)
      markers.push(marker)
    }
    return markers
  },
  getCenterLocation: function() {
    this.mapCtx.getCenterLocation({
      success: function(res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function() {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function() {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  },
  /**
   * 创建地图标识，可以在name上面动手
   */
  markerClass: function(data) {
    let iconPathArr = [
      "../../images/shop_list/hotel_01.png",
      "../../images/shop_list/hotel_02.png"
    ]
    return {
      iconPath: data.clickStatus ? iconPathArr[1] : iconPathArr[0],
      id: data.hotelId,
      title: data.hotelName,
      latitude: data.latitude,
      longitude: data.longitude,
      width: 50,
      height: 50,
      clickStatus: data.clickStatus ? true : false,
      callout: {
        content: data.hotelName,
        display: 'ALWAYS',
        bgColor: data.clickStatus ? '#00ADA9' : '#B4B4B4',
        borderRadius: 4,
        color: '#fff',
        fontSize: 12,
        padding: 5
      }
    }
  },
  /**
   * 获取具体的hotel信息
   */
  createHotelInfoMap() {
    let arr = []
    for (let item of markersData) {
      arr.push({
        hotelId: item.hotelId,
        hotelImgSrc: item.picUrl,
        hotelName: item.hotelName,
        hotelType: item.hotelType == 1 ? '已签约':'未签约',
        hotelRent: `¥${item.startingPrice} / 月起`,
        hotelInfo: item.tags
      })
    }
    return arr
  },
  toSelectCity() {
    let city = this.data.currentCity
    wx.navigateTo({
      url: `../select_city/index?city=${city}`
    });
  },
  mapUpdated() {
    this.setData({
      mapCoverShow: true
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let getCurrentCityInfo = wx.getStorageSync('currentCityInfo')
    this.setData({
      currentCity: getCurrentCityInfo.name,
      currentCityId: getCurrentCityInfo.id
    })
    this.getMapMarks()
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

  }
})