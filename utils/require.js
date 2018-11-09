// Http请求
let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDQzNDExMDE2MjcsInBheWxvYWQiOiJ7XCJtb2JpbGVcIjpcIjE4MDI5MzA5OTM4XCIsXCJwYXNzd29yZFwiOlwiYjRhZjgwNDAwOWNiMDM2YTRjY2RjMzM0MzFlZjlhYzlcIixcIm5ld1Bhc3N3b3JkXCI6bnVsbCxcInZhbGlkYXRlQ29kZVwiOm51bGwsXCJpZFwiOjE4MzE3MTYzMzQyLFwib3BlbklkXCI6bnVsbCxcInJlc2VydmF0aW9uSWRcIjpudWxsfSJ9.RlUEW35FaA9TZY38CbC-X9fsTBBW7unVbbneHpeuk58'
// obj= {url:'', data:'', method:'',token:''}
function wxGetData (obj) {
  var promise = new Promise((resolve, reject) => {
    var that = this;
    wx.request({
      url: obj.url,
      data: obj.data,
      method: obj.method,
      header: { 
        'content-type': 'application/json',
        'member-access-token': token
      },
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