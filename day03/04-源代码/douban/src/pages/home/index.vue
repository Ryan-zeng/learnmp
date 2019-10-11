<template>
  <div>
    <div class="header">
      <span class="title">豆瓣</span>
      <icon type="search"
            size="24"
            color="#04b704">
      </icon>
      <button>
        打开豆瓣App
      </button>
    </div>
    <div class="content">
      <div class="item">
        <div class="item-head">
          <span class="title">影院热映</span>
          <a class="more-link"
             href="/pages/detail/main?type=theater">更多</a>
        </div>
        <scroll-view scroll-x="true"
                     style="width: 100%">
          <view class="scroll-view-item"
                v-for="(item,index1) in theatersList"
                :key="item.id">
            <img :src="item.images.small"
                 alt="">
            <p class="title">{{item.title}}</p>
            <div class="rating">

              <div class="stars">
                <img v-for="n in item.scoreNum"
                     :key="n"
                     src="../../../static/images/star.png"
                     alt="">

                <img v-for="n in (5-item.scoreNum)"
                     :key="n"
                     src="../../../static/images/unstar.png"
                     alt="">
              </div>
              <span>{{item.rating.average?item.rating.average:'暂无评分'}}</span>
            </div>
          </view>
        </scroll-view>
      </div>
      <!-- end 影院热映 -->
      <div class="item">
        <div class="item-head">
          <span class="title">top250</span>
          <a class="more-link"
             href="/pages/detail/main?type=top250">更多</a>
        </div>
        <scroll-view scroll-x="true"
                     style="width: 100%">
          <view class="scroll-view-item"
                v-for="(item,index2) in top250List"
                :key="item.id">
            <img :src="item.images.small"
                 alt="">
            <p class="title">{{item.title}}</p>
            <div class="rating">

              <div class="stars">
                <img v-for="n in item.scoreNum"
                     :key="n"
                     src="../../../static/images/star.png"
                     alt="">

                <img v-for="n in (5-item.scoreNum)"
                     :key="n"
                     src="../../../static/images/unstar.png"
                     alt="">
              </div>
              <span>{{item.rating.average?item.rating.average:'暂无评分'}}</span>
            </div>
          </view>
        </scroll-view>
      </div>
      <!-- top250 -->
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  data () {
    // 影院热映电影列表
    return {
      theatersList: [],
      top250List: []
    }
  },
  // 打开页面时请求数据
  created () {
    // console.log('onload')
    // 获取影院热映电影列表
    this.getTheatersList()

    this.getTop250()

  },
  methods: {
    // 获取影院热映电影列表
    getTheatersList () {
      request({
        url: 'https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a', //开发者服务器接口地址",
      }).then(res => {
        let theatersList = res.data.subjects
        theatersList.forEach(v => {
          v.scoreNum = Math.ceil(v.rating.average / 2)
        })
        this.theatersList = theatersList
      })
      // wx.request({

      //   method: 'GET',
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded' // 默认值
      //   },
      //   success: res => {
      //     // console.log(res)
      //     this.theatersList = res.data.subjects
      //   }
      // });
    },
    // top250
    getTop250 () {
      request({
        url: 'https://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start=50', //开发者服务器接口地址",
      }).then(res => {
        let top250List = res.data.subjects
        top250List.forEach(v => {
          v.scoreNum = Math.ceil(v.rating.average / 2)
        })
        this.top250List = top250List
      })
      // wx.request({
      //   url: 'https://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a', //开发者服务器接口地址",
      //   method: 'GET',
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded' // 默认值
      //   },
      //   success: res => {
      //     // console.log(res)
      //     this.top250List = res.data.subjects
      //   }
      // });
    }
  },
}
</script>

<style lang="less">
.header {
  height: 94rpx;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #f1f1f1;
  padding: 0 36rpx;
  .title {
    color: #00b600;
    font-size: 30rpx;
    font-weight: 600;
    margin-right: 28rpx;
  }
  icon {
    margin-top: 10rpx;
    flex: 1;
  }
  button {
    background-color: #42bd56;
    width: 202rpx;
    height: 60rpx;
    text-align: center;
    line-height: 60rpx;
    color: #fff;
    font-weight: 600;
    border-radius: 8rpx;
    font-size: 22rpx;
  }
}
.item {
  padding: 0 36rpx;
  .item-head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 24rpx 0;
    font-size: 24rpx;
  }
  .title {
    color: #000;
  }
  .more-link {
    color: #42bd56;
  }
  scroll-view {
    white-space: nowrap;
  }
  .scroll-view-item {
    display: inline-block;
    margin-right: 17rpx;
    text-align: center;
    img {
      width: 202rpx;
      height: 288rpx;
    }
    .title {
      font-size: 20rpx;
      margin-top: 16rpx;
    }
    .rating {
      span {
        font-size: 16rpx;
        color: #bebebe;
      }
      .stars {
        display: inline-block;
        margin-right: 6rpx;
        img {
          width: 22rpx;
          height: 22rpx;
          margin-right: 2rpx;
        }
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>