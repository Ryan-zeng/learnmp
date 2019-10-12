<template>
  <div>

    <div class="header">
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
    <div class="goods-list">
      <div class="goods-item"
           v-for="(item, index) in 20"
           :key="index">
        <div class="goods-img">
          <img src="https://img10.360buyimg.com/n2/s240x240_jfs/t1/47562/33/125/375477/5cd2c3bdE4164c44c/7c809fa28037ad16.jpg!q70.jpg"
               alt="">
        </div>

        <div class="main">
          <p class="detail">九阳（Joyoung）热水壶烧水壶电水壶 1.7L大容量双层防烫无缝内胆304不锈钢 家用电热水壶JYK-17F05A</p>
          <p class="price">&yen;69.00</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 0,
      keyword: '小米'
    }
  }

}
</script>

<style lang="less" scoped>
.header {
  position: fixed;
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
  margin-top: 220rpx;
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
</style>