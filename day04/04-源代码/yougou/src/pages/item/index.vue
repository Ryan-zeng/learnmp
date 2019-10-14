<template>
  <div>

    <swiper class="swiper"
            indicator-dots
            autoplay
            circular>
      <block v-for="(item, index) in [1,2,3]"
             :key="index">
        <swiper-item>
          <image class="swiper-img"
                 src="https://img.alicdn.com/imgextra/i2/408107205/O1CN014IOh9d235wDTb3Pl3-408107205.jpg_430x430q90.jpg"></image>
        </swiper-item>
      </block>
    </swiper>
    <!-- 商品信息 -->
    <div class="goods-info">
      <p class="price">￥275</p>
      <div class="name-favo">
        <p class="name">初语2017秋装新款潮牌女装加绒宽松BF风慵懒卫衣女套头连帽上衣</p>
        <div class=favo>
          <span>收藏</span>
        </div>
      </div>
      <p class="express">快递: 免运费</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>