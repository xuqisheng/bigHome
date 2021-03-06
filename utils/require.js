/** http使用说明
 * desc 调用微信API wx.request发送请求
 * @param  {url: String} 请求的地址
 * @param  {isMock: Boolean, default:false} 是否mock数据
 * @param  {method: String, default:'POST'} 请求方法
 * @example 参考上述例子
 */
const { configure } = require("./configure.js")
function wxGetData(obj) {
  var showloadingtime = setTimeout(function () {
    wx.showToast({
      title: '加载中...',
      mask: true,
      icon: 'loading',
      duration: 100000
    })
    },200)
  const {
    url,
    api,
    isMock = false,
    method = 'POST'
  } = obj
  const httpsUrl = isMock ? url : configure.url + '/' +api
  const token = wx.getStorageSync('token')
  var promise = new Promise((resolve, reject) => {
    var that = this;
    wx.request({
      url: httpsUrl,
      data: obj.data,
      method: method,
      header: {
        'content-type': 'application/json',
        'member-access-token': token
      },
      success: function(res) {
        if (res.statusCode) {
          resolve(res);
        } else {
          reject(res + '错误');
        }
      },
      fail: function(e) {
        reject(e);
      },
      complete:function(e){
        clearTimeout(showloadingtime)
        wx.hideToast()
      }
    })
  });
  return promise;
}
module.exports = {
  wxGetData: wxGetData
}