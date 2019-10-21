<template>
  <div class="container">
    <!-- 搜索热区 -->
    <search />
    <!-- 轮播图 -->
    <swiper indicator-dots
            autoplay
            circular
            indicator-color="#ccc"
            indicator-active-color="#fff">
      <block v-for="(item,index) in swiperImgs"
             :key="index">
        <swiper-item>
          <img :src="item.image_src"
               alt="">
        </swiper-item>
      </block>
    </swiper>
    <!-- 分类 -->
    <ul class="cat-list">
      <li v-for="(item, index) in catList"
          :key="index">
        <img :src="item.image_src"
             alt="">
      </li>
    </ul>
    <!-- 楼层 -->
    <ul class="floor-list">
      <li v-for="(item, index) in floorList"
          :key="index">
        <img class="banner"
             :src="item.floor_title.image_src"
             alt="">
        <div class="product-list">
          <div class="left">
            <img :src="item.product_list[0].image_src"
                 alt="">
          </div>
          <div class="right">
            <block v-for="(item2, index2) in item.product_list"
                   :key="index2">
              <img v-if="index2!==0"
                   :src="item2.image_src"
                   alt="">
            </block>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import request from '@/utils/request'
import Search from '@/components/search'
export default {
  components: {
    Search
  },
  data () {
    return {
      // 轮播图图片数组
      swiperImgs: [],
      catList: [],
      floorList: []
    }
  },

  created () {
    // 获取轮播图
    this.getSwiperImgs()
    this.getCatList()
    this.getFloorList()
  },
  methods: {
    // 获取轮播图
    getSwiperImgs () {
      request({
        url: '/api/public/v1/home/swiperdata'
      }).then(res => {
        // console.log(res)
        let { message, meta } = res.data
        if (meta.status === 200) {
          this.swiperImgs = message
        }
      })
    },
    getCatList () {
      request({
        url: '/api/public/v1/home/catitems'
      }).then(res => {
        let { message, meta } = res.data

        if (meta.status === 200) {
          this.catList = message
        }
      })
    },
    getFloorList () {
      request({
        url: '/api/public/v1/home/floordata'
      }).then(res => {
        // console.log(res)
        let { message, meta } = res.data
        if (meta.status === 200) {
          this.floorList = message
        }
      })
    }
  }
}
</script>
</script>

<style lang="less">
swiper-item {
  img {
    width: 100%;
    height: 340rpx;
  }
}
.cat-list {
  display: flex;
  height: 194rpx;
  justify-content: space-evenly;
  align-items: center;
  img {
    width: 128rpx;
    height: 140rpx;
  }
}
.floor-list {
  .banner {
    width: 100%;
    height: 88rpx;
  }
  .product-list {
    padding: 20rpx 17rpx;
    display: flex;
    .left > img {
      width: 232rpx;
      height: 386rpx;
    }
    .right {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      img {
        width: 232rpx;
        height: 188rpx;
        margin: 0 0 10rpx 10rpx;
      }
    }
  }
}
</style>