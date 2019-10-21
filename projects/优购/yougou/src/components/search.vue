<template>
  <div class="header"
       @click="toSearch">
    <div class="hotpot">
      <icon type="search"
            size="14">
      </icon>
      <span>搜索</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toSearch () {
      wx.navigateTo({ url: '/pages/search/main' })
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  background-color: #eb4450;
  height: 100rpx;
  padding: 20rpx 16rpx;
  box-sizing: border-box;
  .hotpot {
    height: 60rpx;
    background-color: #fff;
    border-radius: 6rpx;
    color: #bbb;
    display: flex;
    justify-content: center;
    align-items: center;
    icon {
      margin: 4rpx 16rpx 0 0;
    }
  }
}
</style>