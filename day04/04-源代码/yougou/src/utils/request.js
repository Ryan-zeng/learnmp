function request (options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://autumnfish.cn/wx${options.url}`,
      method: options.method,
      data: options.data || {},
      headers: Object.assign({
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
