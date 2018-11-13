var rq = require("../../utils/require.js")
Page({
  data: {
    content: [],
    contents: [],
    money: [],
    sort: [],
    pxopen: false,
    pxshow: false,
    pxopens: false,
    pxshows: false,
    active: true,
    hidden: false,
    shang: true,
    xia: false,
    shangs: true,
    xias: false,
    hotelListData: [],
  },
  onLoad: function() {
    this.clearCache() //清空缓存
    this.getHotelList() //第一次请求数据
    this.setData({
      money: ['不限', '￥2000以下', '￥2000-￥3500', '￥3500-￥5000', '￥5000以上'],
      sort: ['价格从低到高', '价格从高到低', '距离从近到远']
    })
  },
  cIndex:function(e){
    console.log(e.currentTarget.dataset.index)
  },
  //价格
  money: function(e) {
    if (this.data.pxopen) {
      this.setData({
        pxopen: false,
        pxshow: false,
        active: true,
        hidden: false,
        shang: true,
        xia: false,
        shangs: true,
        xias: false,
      })
    } else {
      this.setData({
        content: this.data.money,
        pxopen: true,
        pxshow: false,
        pxopens: false,
        pxshows: true,
        active: false,
        hidden: true,
        shang: false,
        xia: true,
      })
    }
  },
  //排序
  sort: function(e) {
    if (this.data.pxopens) {
      this.setData({
        pxopens: false,
        pxshows: false,
        active: true,
        hidden: false,
        shangs: true,
        xias: false,
        shang: true,
        xia: false,
      })
    } else {
      this.setData({
        contents: this.data.sort,
        pxopens: true,
        pxshows: false,
        pxopen: false,
        pxshow: true,
        active: false,
        hidden: true,
        shangs: false,
        xias: true,
        isScroll: 'hidden'
      })
    }
  },
  //清空缓存
  clearCache: function(e) {
    this.setData({
      hotelListData: []
    })
  },
  //请求列表
  getHotelList: function(e) {
    let that = this
    let obj = {
      url: 'http://ajfppq.natappfree.cc/api/hotel/getHotelList',
      data: {
        pageNo: 0,
        pageSize: 10,
        cityId: "4406",
        hotelNameLike: ""
      },
      method: 'POST',
      isMock: true
    }
    rq.wxGetData(obj).then((res) => {
      if (res.statusCode == 200) {
        that.setData({
          hotelListData: res.data.data.hotels
        })
      } else {
        console.log(111)
      }
    }).catch((errMsg) => {
      console.log('刷新失败！');
    });
  }
})