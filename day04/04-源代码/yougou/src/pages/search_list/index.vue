<template>
  <div>

    <div class="header"
         :style="{position:isScroll?'fixed':'static'}">
      <div class="search-wrapper">
        <icon type="search"
              size="12">
        </icon>
        <input type="text"
               placeholder="搜索"
               placeholder-class="phCls"
               v-model="keyword"
               @confirm="research"
               confirm-type="search">
      </div>

      <div class="nav">
        <div class="item"
             :class="{active:activeIndex==0}"
             @click="activeIndex=0">综合</div>
        <div class="item"
             :class="{active:activeIndex==1}"
             @click="activeIndex=1">销量</div>
        <div class="item arrow"
             :class="{active:activeIndex==2}"
             @click="activeIndex=2">价格</div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="goods-list"
         v-if="isInit"
         :style="{marginTop:isScroll?'220rpx':'0'}">
      <div class="
         goods-item"
           v-for="(item, index) in goodsList"
           :key="index"
           @click="toItem(item.goods_id)">
        <div class="goods-img">
          <img :src="item.goods_small_logo"
               alt="">
        </div>

        <div class="main">
          <p class="detail">{{item.goods_name}}</p>
          <p class="price">&yen;{{item.goods_price}}</p>
        </div>
      </div>
    </div>
    <p class="bottom-line"
       v-show="isEnd">
      -- 我是有底线的 --
    </p>
  </div>
</template>

<script>
import request from '../../utils/request'
const PAGE_SIZE = 6
export default {
  data () {
    return {
      activeIndex: 0,
      keyword: '',
      isInit: true,
      // 搜索的商品列表
      goodsList: [],
      pagenum: 1,
      isRequest: false,
      isEnd: false,
      isScroll: false
    }
  },
  onLoad (options) {
    console.log('onLoad')
    this.keyword = options.keyword
    // this.queryGoods()
    this.research()
  },
  onReachBottom () {
    // 当前商品总条数和total一至说明已经加载完成
    if (this.isEnd || this.isRequest) {
      return
    }
    this.pagenum++
    this.queryGoods()
  },
  onPullDownRefresh () {
    this.research()
  },
  onPageScroll () {
    this.isScroll = true
  },
  methods: {
    toItem (id) {
      wx.navigateTo({ url: `/pages/item/main?id=${id}` })
    },
    research () {
      this.pagenum = 1
      this.goodsList = []
      this.isEnd = false
      this.isRequest = false
      this.isScroll = false
      this.queryGoods()
    },
    queryGoods () {
      this.isRequest = true
      wx.showLoading()
      request({
        url: '/api/public/v1/goods/search',
        data: {
          query: this.keyword,
          pagesize: PAGE_SIZE,
          pagenum: this.pagenum
        }
      }).then(res => {
        console.log(res)
        wx.hideLoading()
        this.isRequest = false
        let { message, meta } = res.data
        if (meta.status === 200) {
          this.goodsList = [
            ...this.goodsList,
            ...message.goods
          ]
          this.isInit = true
          if (this.goodsList.length === message.total) {
            this.isEnd = true
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>