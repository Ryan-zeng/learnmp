function request (options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://www.uinav.com${options.url}`,
      method: options.method,
      data: options.data || {},
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
}

export default request
