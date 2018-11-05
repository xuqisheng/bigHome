//Http请求
function wxGetData (url, data, method) {
  var promise = new Promise((resolve, reject) => {
    var that = this;
    var postData = data;
    wx.request({
      url: url,
      data: postData,
      method: method,
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.statusCode) {
          resolve(res);
        } else {                
          reject(res+'错误');
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
module.exports={
  wxGetData: wxGetData
}