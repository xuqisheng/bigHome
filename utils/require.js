/** http使用说明
 * desc 调用微信API wx.request发送请求
 * @param  {url: String} 请求的地址
 * @param  {isMock: Boolean, default:false} 是否mock数据
 * @param  {method: String, default:'GET'} 请求方法
 * @example 参考上述例子
 */

let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDQ4NjU5ODA3MzgsInBheWxvYWQiOiJ7XCJtb2JpbGVcIjpcIjEzMjExMTMyMjQxXCIsXCJwYXNzd29yZFwiOm51bGwsXCJuZXdQYXNzd29yZFwiOm51bGwsXCJ2YWxpZGF0ZUNvZGVcIjpcIjMwODQ2N1wiLFwiaWRcIjoxODMxNzE2MzMzOCxcIm9wZW5JZFwiOm51bGwsXCJyZXNlcnZhdGlvbklkXCI6bnVsbH0ifQ.GJDoWQJHvlbFJGX_ZK4LMXulyYE5-BEE2kaiUMwcgYM'

function wxGetData(obj) {
  const { url, isMock = false, method = 'GET' } = obj
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
        error: function(e) {
          reject('网络出错');
        }
      })
    });
  return promise;
}
module.exports = {
  wxGetData: wxGetData
}