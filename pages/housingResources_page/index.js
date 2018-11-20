var rq = require("../../utils/require.js")
var mlist = [[-1,-1],[-1,2000],[2000,3500],[3500,5000],[5000,-1]]
var slist = [['price', 1], ['price', 2], ['distance',1]]
Page({
  data: {
    money_content: 5,
    type_content: 3,
    money: [{
        name: '不限',
        checked: false
      },
      {
        name: '￥2000以下',
        checked: false
      },
      {
        name: '￥2000-￥3500',
        checked: false
      },
      {
        name: '￥3500-￥5000',
        checked: false
      },
      {
        name: '￥5000以上',
        checked: false
      }
    ],
    sort: [{
        name: '价格从低到高',
        checked: false
      },
      {
        name: '价格从高到低',
        checked: false
      },
      {
        name: '距离从近到远',
        checked: false
      }
    ],
    pxopen: false,
    pxshow: false,
    pxopens: false,
    pxshows: false,
    active: false,
    hidden: false,
    shang: false,
    xia: false,
    shangs: false,
    xias: false,
    hotelListData: [],
    showAll:false ,//等数据渲染完毕再显示dom 
    showData:true,
    showError:false
  },
  onLoad: function() {
    this.clearCache() //清空缓存
    this.getHotelList() //第一次请求数据
  },
  //按价格排序
  money_sort: function(e) {
    var that = this
    if (e.currentTarget.dataset.index == that.data.money_content) {
      var idx = +e.currentTarget.dataset.index
      var value = 'money[' + idx + '].checked'
      that.setData({
        [value]: false,
        money_content: 5,
      })
    } else {
      setTimeout(function () {
      that.setData({
        money_content: e.currentTarget.dataset.index,
        pxopen: false,
        pxshow: false,
        active: true,
        hidden: false,
        shang: true,
        xia: false,
        shangs: true,
        xias: false,
      })
        that.getSortList(that.data.money_content, that.data.type_content)
      }, 100)
    }
  },
  //按类型排序
  type_sort: function(e) {
    var that = this
    if (e.currentTarget.dataset.index == that.data.type_content) {
      var idx = +e.currentTarget.dataset.index
      var value = 'sort[' + idx + '].checked'
      that.setData({
        [value]: false,
        type_content: 3
      })
    } else {
      setTimeout(function () {
      that.setData({
        type_content: e.currentTarget.dataset.index,
        pxopens: false,
        pxshows: false,
        active: true,
        hidden: false,
        shangs: true,
        xias: false,
        shang: true,
        xia: false,
      })
        that.getSortList(that.data.money_content, that.data.type_content)},100)

    }
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
  },
  //清空缓存
  clearCache: function(e) {
    this.setData({
      hotelListData: []
    })
  },
  //请求列表
  getHotelList: function (p1, p2, s1, s2) {
    let that = this
    let obj = {
      url: 'http://bgy.h-world.com/api/hotel/getHotelList',
      data: {
        pageNo: 0,
        pageSize: 10,
        cityId: "4406",
        priceFloorLimit: p1,
        priceUpperLimit: p2,
        sortKey: s1,
        sortSeq: s2
      },
      method: 'POST',
      isMock: true
    }
    rq.wxGetData(obj).then((res) => {
      if (res.statusCode == 200) {
        that.setData({
          hotelListData: res.data.data.hotels,
          showError:false
        })
        setTimeout(function(){
          that.setData({
            showAll: true
          })
        },200)
      } else {
        that.setData({
          showAll:true,
          showError: true
        })
        wx.showToast({            
          title: '加载失败！',
          mask: true,
          icon: 'none',
          duration:1000
        })
      }
    }).catch((errMsg) => {
      that.setData({
        showAll: true,
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
  //地图搜房跳转
  jtm: function(e) {
    wx.navigateTo({
      url: '../shop_list/index'
    })
  },
  //点击蒙版收起弹窗
  hidtemp: function(e) {
    this.setData({
      pxopen: false,
      pxshow: false,
      active: true,
      hidden: false,
      shang: true,
      xia: false,
      shangs: true,
      xias: false,
      pxopens: false,
      pxshows: false,
      active: true,
      hidden: false,
      shangs: true,
      xias: false,
      shang: true,
      xia: false,
    })
    this.getSortList(this.data.money_content, this.data.type_content)
  },
  //获取排序后的列表
  getSortList:function(m,s){
      let p1 = m<5? mlist[m][0] : ''
      let p2 = m<5? mlist[m][1] : ''
      let s1 = s<3? slist[s][0] : ''
      let s2 = s<3? slist[s][1] : ''
      this.getHotelList(p1,p2,s1,s2)
  }
})