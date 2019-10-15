<template>
  <div>
    <search></search>
    <swiper indicator-dots
            autoplay
            circular="true"
            interval="2000"
            duration="200">
      <block v-for="(item,index) in imgList"
             :key="index">
        <swiper-item>
          <view class="swiper-item">
            <img :src="item.image_src"
                 alt="">
          </view>
        </swiper-item>
      </block>
    </swiper>
    <div class="nav">
      <div v-for="(item,index) in cateList"
           :key="index">
        <img :src="item.image_src"
             :alt="name">
        <p class="name">{{item.name}}</p>
      </div>
    </div>
    <div class="floor"
         v-for="(item, index) in floorList"
         :key="index">
      <span>{{item.floor_title.name}}</span>
      <img class="banner"
           :src="item.floor_title.image_src"
           alt="">

      <div class="main">
        <div class="left">
          <img :src="item.product_list[0].image_src"
               alt="">
        </div>
        <div class="right">
          <block v-for="(subItem, subIndex) in item.product_list"
                 :key="subIndex">
            <img v-if="subIndex!==0"
                 :src="subItem.image_src"
                 alt="">
          </block>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
import Search from '../../components/search'
export default {
  components: {
    Search
  },
  data () {
    return {
      imgList: [],
      cateList: [],
      floorList: []
    }
  },

  created () {
    this.getImgs()
    this.getCateList()
    this.getFloor()
  },
  methods: {
    getImgs () {
      request({
        url: '/api/public/v1/home/swiperdata'
      }).then(res => {
        // console.log(res)
        let { message, meta } = res.data
        if (meta.status === 200) {
          this.imgList = message
        }
      })
    },
    getCateList () {
      request({
        url: '/api/public/v1/home/catitems'
      }).then(res => {
        // console.log(res)
        let { message, meta } = res.data
        if (meta.status === 200) {
          // this.imgList = message
          this.cateList = message
        }
      })
    },
    getFloor () {
      request({
        url: '/api/public/v1/home/floordata'
      }).then(res => {
        // console.log(res)
        let { message, meta } = res.data
        if (meta.status === 200) {
          // this.imgList = message
          this.floorList = message
        }
      })
    }
  }
}
</script>

<style lang="less">
.swiper-item {
  width: 750rpx;
  height: 340rpx;
  img {
    width: 100%;
  }
}
.nav {
  display: flex;
  margin: 20rpx 0;
  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    width: 80rpx;
    height: 80rpx;
  }
}
// 楼层
.floor {
  position: relative;
  .banner {
    height: 85rpx;
    width: 100%;
  }
  & > span {
    position: absolute;
    top: 10rpx;
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
      display: flex;
      flex-wrap: wrap;
      img {
        width: 230rpx;
        height: 190rpx;
        border-radius: 8rpx;
        margin-left: 12rpx;
      }
    }
  }
}
</style>