// pages/storage_demo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // localStorage.set('name','sam')
  },
  setObj(){
    let girlFriend={
      name:'杨超越',
      age:18
    }
    wx.setStorageSync('age', girlFriend)
  },
  save(){
    // wx.setStorage({
    //   key: 'name',
    //   data: 'Joven',
    // })
    wx.setStorageSync('name', 'sam')
    wx.setStorageSync('age', '18')

  },
  clearData(){
    wx.clearStorageSync()
  },
  getData(){
    // 异步取数据
    wx.getStorage({
      key: 'name',
      success: function(res) {
        console.log(res)
      }
    })
    // 建议用：同步取数据
    console.log(wx.getStorageSync('name'))
    console.log(wx.getStorageInfoSync())
  },
  clearItem(){
    // 异步删除指定key的数据
    wx.removeStorage({
      key: 'name',
      success: function(res) {
        console.log(res)
      },
    })
    // 同步删除指定key的数据
    wx.removeStorageSync('name')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})