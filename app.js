//app.js
App({
  //获取用户地理位置权限
  getPermission: function(obj) {
    wx.chooseLocation({
      success: function(res) {
        obj.setData({
          addr: res.address, //调用成功直接设置地址
          alearyAddr: true
        })
      },
      fail: function() {
        wx.getSetting({
          success: function(res) {
            var statu = res.authSetting;
            if (!statu['scope.userLocation']) {
              wx.showModal({
                title: '是否授权当前位置',
                content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                success: function(tip) {
                  if (tip.confirm) {
                    wx.openSetting({
                      success: function(data) {
                        if (data.authSetting["scope.userLocation"] === true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 1000
                          })
                          //授权成功之后，再调用chooseLocation选择地方
                          wx.chooseLocation({
                            success: function(res) {
                              obj.setData({
                                userName: res.address
                              })
                            },
                          })
                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'success',
                            duration: 1000
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          },
          fail: function(res) {
            wx.showToast({
              title: '调用授权窗口失败',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    version: "1.0.0",
    localInfo: null
  }
})