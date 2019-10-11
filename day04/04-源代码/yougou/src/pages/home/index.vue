<template>
  <div>
    <div class="header">
      <icon type="search"
            size="12">
      </icon>
      <input type="text"
             placeholder="搜索"
             placeholder-class="phCls">
    </div>
    <swiper indicator-dots
            autoplay
            circular="true"
            interval="2000"
            duration="200">
      <block v-for="item in [1,2,3]"
             :key="item">
        <swiper-item>
          <view class="swiper-item">
            <img src="https://imgcps.jd.com/ling/5285120/5q-P5LiA5Y2w54ix5LiK5q2k5Yi7/54iG5qy-6ZmQ5pe26ZmQ6YePNeaKmA/p-5bd8253082acdd181d02fa47/8a6a0f35.jpg"
                 alt="">
          </view>
        </swiper-item>
      </block>
    </swiper>
    <div class="nav">
      <div>
        <img src="../../../static/images/category.png"
             alt="">
      </div>
      <div>
        <img src="../../../static/images/second.png"
             alt=""></div>
      <div>
        <img src="../../../static/images/supermarket.png"
             alt=""></div>
      <div>
        <img src="../../../static/images/baby.png"
             alt=""></div>
    </div>
    <div class="floor">
      <img class="banner"
           src="https://img12.360buyimg.com/da/jfs/t1/80769/21/11514/97311/5d8c1b77Ebfae1948/503d5a0df32e0154.jpg.webp"
           alt="">
      <div class="main">
        <div class="left">
          <img src="https://img.alicdn.com/tfscom/i2/528296282/O1CN01np9UlB1wHCe7zabWl_!!528296282.jpg_280x380xz.jpg"
               alt="">
        </div>
        <div class="right">
          <img src="https://img.alicdn.com/tfscom/i2/528296282/O1CN01np9UlB1wHCe7zabWl_!!528296282.jpg_280x380xz.jpg"
               alt="">
          <img src="https://img.alicdn.com/tfscom/i2/528296282/O1CN01np9UlB1wHCe7zabWl_!!528296282.jpg_280x380xz.jpg"
               alt="">
          <img src="https://img.alicdn.com/tfscom/i2/528296282/O1CN01np9UlB1wHCe7zabWl_!!528296282.jpg_280x380xz.jpg"
               alt="">
          <img src="https://img.alicdn.com/tfscom/i2/528296282/O1CN01np9UlB1wHCe7zabWl_!!528296282.jpg_280x380xz.jpg"
               alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
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

.swiper-item {
  width: 750rpx;
  height: 340rpx;
  background-color: green;
}
.nav {
  display: flex;
  margin: 10rpx 0;
  div {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  img {
    width: 117rpx;
    height: 146rpx;
  }
}
// 楼层
.floor {
  .banner {
    height: 85rpx;
  }
  .main {
    padding: 20rpx 16rpx;
    display: flex;
    .left {
      img {
        width: 234rpx;
        height: 390rpx;
        border-radius: 8rpx;
      }
    }
    .right {
      flex: 1;
      img {
        width: 232rpx;
        height: 190rpx;
        border-radius: 8rpx;
        margin-left: 12rpx;
      }
    }
  }
}
</style>