// Http请求
// obj= {url:'', data:'', method:'',token:''}
/*require.wxGetData (obj).then( (res)=>{
 console.log(res);//正确返回结果
  //其他操作
      } ).catch ( (errMsg) => {
   console.log(errMsg);//错误提示信息
  //其他操作
 } );
*/
function wxGetData (obj) {
  var promise = new Promise((resolve, reject) => {
    var that = this;
    wx.request({
      url: obj.url,
      data: obj.data,
      method: obj.method,
      header: { 
        'content-type': 'application/json',
        'token': obj.token 
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