<template>
  <div>
    <button open-type="getUserInfo"
            @getuserinfo="getuserinfo">点我登录</button>
  </div>
</template>

<script>
import request from '../../utils/request'

export default {
  data () {
    return {
      userinfo: {
      }
    }
  },

  methods: {
    getuserinfo (res) {
      console.log(res)
      let detail = res.mp.detail

      // 得到code
      wx.login({
        success: res => {
          request({
            url: `/api/public/v1/users/wxlogin`,
            method: 'POST',
            data: {
              code: res.code,
              encryptedData: detail.encryptedData,
              iv: detail.iv,
              rawData: detail.rawData,
              signature: detail.signature
            }
          }).then(backData => {
            console.dir(backData)
            wx.setStorageSync('token', backData.data.message.token)
            wx.setStorageSync('userInfo', detail.userInfo)
            // 返回购物车界面
            wx.navigateBack()
          })
        }
      })
    }
  }
}
</script>

<style>
</style>