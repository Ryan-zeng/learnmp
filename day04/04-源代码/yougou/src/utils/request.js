function request (options) {
  return new Promise((resolve, reject) => {
    // 默认有一个loading
    if (!options.noLoading) {
      wx.showLoading({
        title: '加载中'
      })
    }

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
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  })
}

export default request
