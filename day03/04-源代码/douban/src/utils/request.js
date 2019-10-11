// 用来将wx.request封装为一个promise对象

function request(options) {
  var p = new Promise((resolve, reject) => {
    // 逻辑，发送请求到服务器
    wx.request({
      url: options.url,
      method: options.method || 'GET',
      data: options.data || {},
      dataType: options.dataType || 'json',
      header: Object.assign({
        'content-type': 'application/x-www-form-urlencoded'
      }, options.header),
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
  return p
}

export default request
