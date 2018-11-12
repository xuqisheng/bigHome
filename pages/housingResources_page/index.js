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
  },
  onLoad: function () {
    let obj = { 
      url:'hotel/getHotelList',
      data: { pageNo: 1, pageSize: 10, cityId: "4406", hotelNameLike: ""},
      method:'post',
    }
    rq.wxGetData(obj).then((res) => {
      console.log(res);
    }).catch((errMsg) => {
      console.log(errMsg);
    });
    this.setData({
      money: ['不限','￥2000以下','￥2000-￥3500','￥3500-￥5000','￥5000以上'],
      sort:['价格从低到高','价格从高到低','距离从近到远']
    })
  },
  //价格
  money: function (e) {
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
        xia: true
      })
    }
  },
  //排序
  sort: function (e) {
    if (this.data.pxopens) {
      this.setData({
        pxopens: false,
        pxshows: false,
        active: true,
        hidden: false,
        shangs: true,
        xias: false,
        shang: true,
        xia: false
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
      })
    }
  }
})
