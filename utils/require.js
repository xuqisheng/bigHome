// Http请求
let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDQ2MDQyNDgyMDgsInBheWxvYWQiOiJ7XCJtb2JpbGVcIjpcIjEzODIzNDU4MTMwXCIsXCJwYXNzd29yZFwiOlwiZGM0ODNlODBhN2EwYmQ5ZWY3MWQ4Y2Y5NzM2NzM5MjRcIixcIm5ld1Bhc3N3b3JkXCI6bnVsbCxcInZhbGlkYXRlQ29kZVwiOm51bGwsXCJpZFwiOjUwNTMsXCJvcGVuSWRcIjpudWxsLFwicmVzZXJ2YXRpb25JZFwiOm51bGx9In0.wdtRJE6ZJ5MIobO5O724Lbo3HuArdZmg--fZ1Wbq6NY'
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