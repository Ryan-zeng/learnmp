// 作用：用来将 wx.request 封装为一个 promise 对象
// promise 特点：
//  一创建就立即执行，一般情况下解决这个问题我们会将其封装为一个函数
// options:请求时的参数对象
function myrequest(options) {
  var p = new Promise((resolve, reject) => {
    // 逻辑：发送请求到服务器
    wx.request({
      url: options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: options.header || {},
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    });
  });
  // 返回一个promise 对象
  return p;
}

// 暴露给外界
export default myrequest;
