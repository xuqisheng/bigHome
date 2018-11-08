// pages/shop-list/index.js
let markersData = []
let hotelData = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    centerX: '',
    centerY: '',
    hotelInfoMap: {
    },
    currentId: '',
  },

  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    if (e.markerId == this.data.currentId) return
    let currentData = hotelData.find(item => item.id == e.markerId)
    this.setData({
      currentId: e.markerId,
      hotelInfoMap: this.createHotelInfoMap(currentData),
      markers: this.createMarker(e.markerId)
    })
  },
  controltap(e) {
    console.log(e.controlId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    this.getHotalMarkerData()
  },
  init() {
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        let latitude = res.latitude
        let longitude = res.longitude
        this.comparedMark(res) //比较坐标，用于展示离定位最近的默认坐标
      }
    })
  },
  comparedMark(data) {
    //比较流程，后续再补TODO
    let id = 0 //先默认取0
    this.setData({
      currentId: id
    })
    this.renderPage(data)
  },
  renderPage(data) {
    let currentData = hotelData.find(item => item.id == this.data.currentId)
    this.setData({
      centerX: data.latitude,
      centerY: data.longitude,
      markers: this.createMarker(this.data.currentId),
      hotelInfoMap: this.createHotelInfoMap(currentData)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
    
  },
  getHotalMarkerData() {
    let that = this
    wx.request({
      url: 'https://www.easy-mock.com/mock/5be3ac67ff88a57e78f70a10/mapList/mapMarkList',
      success: function(res) {
        if (res.statusCode) {
          markersData = res.data.data
          that.getHotalInfoData()
        }
      },
      error: function(e) {
        console.log(e)
      }
    })
  },
  getHotalInfoData() {
    let that = this
    wx.request({
      url: 'https://www.easy-mock.com/mock/5be3ac67ff88a57e78f70a10/mapList/hotelList',
      success: function(res) {
        if (res.statusCode) {
          hotelData = res.data.data
          that.init()
        }
      },
      error: function(e) {
        console.log(e)
      }
    })
  },
  /**
   * 获取当前酒店标识
   */
  // getCurrentMarkers:function() {
  //   for (let item of mapData) {
  //     if (item.id === '0') { //进页面具体展示哪个地点，先默认取第一条，后续有数据再处理TODO
  //       item.clickStatus = true
  //       this.setData({
  //         currentId: item.id
  //       })
  //     }
  //   }
  // },
  /**
   * 获取酒店标识
   */
  createMarker: function(id) {
    let markers = []
    for (let item of markersData) {
      item.clickStatus = false
      if (item.id == id) { //进页面具体展示哪个地点，先默认取第一条，后续有数据再处理TODO
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
      id: data.id,
      title: data.name,
      latitude: data.latitude,
      longitude: data.longitude,
      width: 50,
      height: 50,
      clickStatus: data.clickStatus ? true : false,
      callout: {
        content: data.name,
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
  createHotelInfoMap(item) {
    // let currentData = hotelData.find(item => item.id == this.data.currentId)
    return {
      hotelImgSrc: item.imageSrc,
      hotelName: item.name,
      hotelBookStatus: item.bookStatus,
      hotelRent: item.rent,
      hotelInfo: item.configure
    }
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

  }
})