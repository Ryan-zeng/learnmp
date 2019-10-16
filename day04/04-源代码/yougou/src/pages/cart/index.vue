<template>
  <div>
    <div class="address-wrapper">
      <div class="address"
           v-show="hasAddress">
        <div class="receiver">
          <p class="name">收货人：苏</p>
          <p class="phone-num">15324123423</p>
          <span class="iconfont icon-arrow-right"></span>
        </div>
        <p class="address-txt">收货地址：广东省广州市天河区珠吉</p>
      </div>
      <!-- 选择地址 -->
      <div class="choose-address"
           v-show="!hasAddress">
        <p>请选择地址</p>
        <span class="iconfont icon-arrow-right"></span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      hasAddress: true
    }
  }
}
</script>

<style lang="less">
.address-wrapper {
  display: flex;
  flex-direction: column;
  padding: 44rpx 30rpx 48rpx 20rpx;
  .address {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50rpx;
    position: relative;
    .phone-num {
      margin-right: 40rpx;
    }
    .icon-arrow-right {
      position: absolute;
      top: 8rpx;
      right: 0;
      color: #999;
    }
  }
}
</style>