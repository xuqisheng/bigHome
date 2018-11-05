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
      success: function (res) {//服务器返回数据
        if (res.data.status == 1) {
          //res.data 为 后台返回数据，格式为{"data":{...}, "info":"成功", "status":1}, 后台规定：如果status为1,既是正确结果。可以根据自己业务逻辑来设定判断条件
          resolve(res.data.data);
        } else {                //返回错误提示信息
          reject(res.data.info);
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