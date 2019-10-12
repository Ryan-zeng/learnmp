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
               v-model="keyword">
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
         :key="index">
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
      keyword: '小米',
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
    // console.log(options)
    this.keyword = options.keyword
    this.queryGoods()
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
    this.pagenum = 1
    this.goodsList = []
    this.isEnd = false
    this.isRequest = false
    this.isScroll = false
    this.queryGoods()
  },
  onPageScroll () {
    this.isScroll = true
  },
  methods: {
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
        // console.log(res)
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
.header {
  position: static;
  left: 0;
  top: 0;
  right: 0;
  background-color: #fff;
}
.search-wrapper {
  background-color: #eee;
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
.nav {
  height: 102rpx;
  display: flex;
  border-bottom: 1px solid #ddd;
  align-items: center;
  .item {
    width: 33.33%;
    text-align: center;
    &.active {
      color: #eb4450;
    }
  }
  .arrow {
    position: relative;
    &::before,
    &::after {
      position: absolute;
      top: -10rpx;
      right: 50rpx;
      content: "";
      width: 0;
      height: 0;
      border-width: 16rpx;
      border-style: solid;
      border-color: transparent transparent #666 transparent;
    }
    &::after {
      top: 30rpx;
      border-color: #666 transparent transparent transparent;
    }
  }
}

.goods-list {
  padding-left: 20rpx;
  .goods-item {
    height: 262rpx;
    border-bottom: 1px solid #ddd;
    display: flex;
    padding: 30rpx 30rpx 30rpx 0;
    box-sizing: border-box;
    .goods-img {
      img {
        width: 200rpx;
        height: 200rpx;
      }
    }
    .main {
      margin-left: 24rpx;
      .detail {
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; // 控制多行的行数
        -webkit-box-orient: vertical;
      }
      .price {
        color: #eb4450;
        font-size: 30rpx;
        margin-top: 80rpx;
      }
    }
  }
}

.bottom-line {
  text-align: center;
  line-height: 100rpx;
  color: #999;
}
</style>