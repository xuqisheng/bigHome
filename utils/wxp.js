//promise调用微信API
const f = (func, obj)=> {
  return new Promise((resolve, reject) => {
    func({
      ...obj,
      success: resolve,
      fail: reject
    })
  })
}
var WXP = {}

for(let key in wx) {
  WXP[key] = obj => f(wx[key], obj)
}
export default WXP