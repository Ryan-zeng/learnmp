<template>
  <div class="header"
       @click="toSearch">
    <icon type="search"
          size="12">
    </icon>
    <input type="text"
           placeholder="搜索"
           placeholder-class="phCls">
  </div>
</template>

<script>
export default {
  methods: {
    toSearch () {
      wx.navigateTo({ url: '/pages/search_all/main' })
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  background-color: #eb4450;
  padding: 20rpx 16rpx 20rpx;
  position: relative;
  icon {
    position: absolute;
    margin: 20rpx;
  }
  input {
    height: 60rpx;
    border-radius: 6rpx;
    border: 1px solid #ccc;
    background-color: #fff;
    padding-left: 60rpx;
  }
  .phCls {
    color: #bdbdbd;
    font-size: 30rpx;
  }
}
</style>