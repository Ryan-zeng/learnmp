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
      <p class="title">{{title}}</p>
      <view class="movie-list"
            @click="toDetail">
        <view class="item"
              v-for="(item,index2) in movieList"
              :key="item.id">
          <img :src="item.images.small"
               alt="">
          <p class="movie-name">{{item.title}}</p>
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
      </view>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  data () {
    return {
      title: '影院热映',
      movieList: []
    }
  },
  onLoad (options) {
    let type = options.type

    if (type === 'theater') {
      this.getTheatersList()
    } else {
      this.getTop250()
      this.title = 'top250'
    }
    wx.setNavigationBarTitle({
      title: this.title
    });
  },
  methods: {
    toDetail () {
      wx.navigateTo({ url: '/pages/detail/main' });
    },
    getTheatersList () {
      request({
        url: 'https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a', //开发者服务器接口地址",
      }).then(res => {
        let theatersList = res.data.subjects
        theatersList.forEach(v => {
          v.scoreNum = Math.ceil(v.rating.average / 2)
        })
        this.movieList = theatersList
      })
    },
    getTop250 () {
      request({
        url: 'https://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start=50', //开发者服务器接口地址",
      }).then(res => {
        let top250List = res.data.subjects
        top250List.forEach(v => {
          v.scoreNum = Math.ceil(v.rating.average / 2)
        })
        this.movieList = top250List
      })
    }
  }
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
.content {
  padding: 0 44rpx;
  .title {
    height: 130rpx;
    line-height: 130rpx;
    font-size: 20rpx;
  }
  .movie-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .item {
    width: 33.33%;
    text-align: center;
    margin-bottom: 54rpx;
    img {
      width: 202rpx;
      height: 288rpx;
    }
    .movie-name {
      font-size: 20rpx;
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