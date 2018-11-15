/** http使用说明
 * desc 调用微信API wx.request发送请求
 * @param  {url: String} 请求的地址
 * @param  {isMock: Boolean, default:false} 是否mock数据
 * @param  {method: String, default:'GET'} 请求方法
 * @example 参考上述例子
 */

let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDQ2MDQyNDgyMDgsInBheWxvYWQiOiJ7XCJtb2JpbGVcIjpcIjEzODIzNDU4MTMwXCIsXCJwYXNzd29yZFwiOlwiZGM0ODNlODBhN2EwYmQ5ZWY3MWQ4Y2Y5NzM2NzM5MjRcIixcIm5ld1Bhc3N3b3JkXCI6bnVsbCxcInZhbGlkYXRlQ29kZVwiOm51bGwsXCJpZFwiOjUwNTMsXCJvcGVuSWRcIjpudWxsLFwicmVzZXJ2YXRpb25JZFwiOm51bGx9In0.wdtRJE6ZJ5MIobO5O724Lbo3HuArdZmg--fZ1Wbq6NY'

function wxGetData(obj) {
  wx.showToast({
    title: '加载中...',
    mask: true,
    icon: 'loading',
    duration:100000
  })
  const {
    url,
    isMock = false,
    method = 'GET'
  } = obj
  const httpsUrl = isMock ? url : "http://bq2rfx.natappfree.cc/api/" + url
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
        wx.hideToast()
      }
    })
  });
  return promise;
}
module.exports = {
  wxGetData: wxGetData
}