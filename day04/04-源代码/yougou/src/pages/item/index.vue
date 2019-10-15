<template>
  <div class="wrapper">

    <swiper class="swiper"
            indicator-dots
            autoplay
            circular>
      <block v-for="(item, index) in goodsInfo.pics"
             :key="index">
        <swiper-item>
          <image class="swiper-img"
                 :src="item.pics_big_url"
                 @click="previewImage(item.pics_big_url,goodsInfo.pics)"></image>
        </swiper-item>
      </block>
    </swiper>
    <!-- 商品信息 -->
    <div class="goods-info">
      <p class="price">￥{{goodsInfo.goods_price}}</p>
      <div class="name-favo">
        <p class="name">{{goodsInfo.goods_name}}</p>
        <div class=favo>
          <span class="iconfont icon-fenxiang-1"></span>
          <span>分享</span>
          <button open-type="share">分享</button>
        </div>
      </div>
      <p class="express">快递: 免运费</p>
    </div>
    <div class="promote">
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
        <button open-type="contact">联系客服</button>
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
import request from '../../utils/request'
export default {
  data () {
    return {
      tabArr: [
        '图文介绍', '规格参数'
      ],
      activeIndex: 0,
      goodsInfo: {},
      isInit: false
    }
  },
  onLoad (options) {
    console.log(options.id)
    this.getGoodsInfo(options.id)
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage () {
    return {
      title: this.goodsInfo.goods_name
    }
  },
  methods: {
    getGoodsInfo (id) {
      request({
        url: `/api/public/v1/goods/detail?goods_id=${id}`
      }).then(res => {
        let { meta, message } = res.data
        console.dir(message)
        if (meta.status === 200) {
          this.goodsInfo = message
          this.isInit = false
        }
      })
    },
    /*
    current 当前显示的图片
    urls预览的图片集合
    */
    previewImage (current, imgs) {
      let urls = []
      imgs.forEach(v => {
        urls.push(v.pics_big_url)
      })
      wx.previewImage({
        current,
        urls
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>