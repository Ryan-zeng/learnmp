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
      // 后端解析请求参数的content-type为application/json,所以这里默认就行
      header: options.header,
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
