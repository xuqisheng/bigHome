// Http请求
/*var rq = require("../../utils/require.js")
let obj= {      
  url:'hotel/getHotelList',
  data: { pageNo: 1, pageSize: 10, cityId: "4406", hotelNameLike: "" },
  method: 'post',
  }
 rq.wxGetData (obj).then( (res)=>{
   /*require.wxGetData (obj).then( (res)=>{
 console.log(res);//正确返回结果
  //其他操作
      } ).catch ( (errMsg) => {
   console.log(errMsg);//错误提示信息
  //其他操作
 } );
*/
let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDQzNDExMDE2MjcsInBheWxvYWQiOiJ7XCJtb2JpbGVcIjpcIjE4MDI5MzA5OTM4XCIsXCJwYXNzd29yZFwiOlwiYjRhZjgwNDAwOWNiMDM2YTRjY2RjMzM0MzFlZjlhYzlcIixcIm5ld1Bhc3N3b3JkXCI6bnVsbCxcInZhbGlkYXRlQ29kZVwiOm51bGwsXCJpZFwiOjE4MzE3MTYzMzQyLFwib3BlbklkXCI6bnVsbCxcInJlc2VydmF0aW9uSWRcIjpudWxsfSJ9.RlUEW35FaA9TZY38CbC-X9fsTBBW7unVbbneHpeuk58'

function wxGetData(obj) {
  const { url, isMock = false } = obj
  const AjaxUrl = isMock ? url : "http://bq2rfx.natappfree.cc/api/" + url
    var promise = new Promise((resolve, reject) => {
      var that = this;
      wx.request({
        url: AjaxUrl,
        data: obj.data,
        method: obj.method,
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