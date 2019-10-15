<template>
  <div class="wrapper">

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
          <span class="iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-"></span>
          <span>收藏</span>
        </div>
      </div>
      <p class="express">快递: 免运费</p>
    </div>
    <div class="promote"
         v-if="false">
      <ul>
        <li>
          <span class="name">促销</span>
          <span class="detail">满300减30元</span>
        </li>
        <li class="brother">
          <span class="name">已选</span>
          <span class="detail gray">黑色/S/1件</span>
        </li>
        <li>
          <span class="name">送至</span>
          <span class="detail gray">广东省广州市海珠区></span>
        </li>
      </ul>
    </div>
    <!-- 图文介绍 -->
    <div class="goods-detail">
      <div class="tabs">
        <span :class="{active:index===activeIndex}"
              v-for="(item, index) in tabArr"
              :key="index"
              @click="activeIndex=index">{{item}}</span>
      </div>
      <div class="main">
        <div v-if="activeIndex==0">图文介绍</div>
        <div v-else>商品参数</div>
      </div>
    </div>
    <div class="fixed-bottom">
      <div class="icon-text">
        <span class="iconfont icon-kefu"></span>
        <span>联系客服</span>
      </div>
      <div class="icon-text">
        <span class="iconfont icon-gouwuche"></span>
        <span>购物车</span>
      </div>
      <div class="btn add-cart-btn">加入购物车</div>
      <div class="btn buy-btn">立即购买</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabArr: [
        '图文介绍', '规格参数'
      ],
      activeIndex: 0
    }
  }
}
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>