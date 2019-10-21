<template>
  <div>
    <!-- 完成顶部区域 -->
    <div class="top">
      <div class="left">
        <span>豆瓣</span>
        <icon type="search" size="20" color="#00b600"></icon>
      </div>
      <div class="right">
        <button>打开豆瓣App</button>
      </div>
    </div>
    <!-- 完成影院热映 -->
    <div class="content">
      <div class="title">
        <span>正在热映</span>
        <navigator url="/pages/more/main?type=intheater">更多</navigator>
      </div>
      <div class="list">
        <!-- 横向滚动 -->
        <scroll-view class="scroll-view_H" scroll-x style="width: 100%">
          <view class="myitem scroll-view-item_H" v-for="(item, index) in intheatersList" :key="index">
            <image class="img" :src="item.images.small"></image>
            <view class="name">{{ item.title }}</view>
            <view v-if="item.num !== 0" class="score">
              <img v-if="item.num >= 1" src="/static/images/f.png" alt="">
              <img v-else src="/static/images/e.png" alt="">
              <img v-if="item.num >= 2" src="/static/images/f.png" alt="">
              <img v-else src="/static/images/e.png" alt="">
              <img v-if="item.num >= 3" src="/static/images/f.png" alt="">
              <img v-else src="/static/images/e.png" alt="">
              <img v-if="item.num >= 4" src="/static/images/f.png" alt="">
              <img v-else src="/static/images/e.png" alt="">
              <img v-if="item.num >= 5" src="/static/images/f.png" alt="">
              <img v-else src="/static/images/e.png" alt="">
              <span>{{ item.rating.average }}</span>
            </view>
            <view v-else class="score">
              暂无评分
            </view>
          </view>
        </scroll-view>
      </div>
    </div>
    <!-- 完成top250 -->
    <div class="content">
      <div class="title">
        <span>top250</span>
        <navigator url="/pages/more/main?type=top250">更多</navigator>
      </div>
      <div class="list">
        <!-- 横向滚动 -->
        <scroll-view class="scroll-view_H" scroll-x style="width: 100%">
          <view class="myitem scroll-view-item_H" v-for="(item, index) in top250" :key="index">
            <image class="img" :src="item.images.small"></image>
            <view class="name">{{ item.title }}</view>
            <view v-if="item.num !== 0" class="score">
              <img v-if="item.num >= 1" src="/static/images/f.png" alt="">
              <img v-else src="/static/images/e.png" alt="">
              <img v-if="item.num >= 2" src="/static/images/f.png" alt="">
              <img v-else src="/static/images/e.png" alt="">
              <img v-if="item.num >= 3" src="/static/images/f.png" alt="">
              <img v-else src="/static/images/e.png" alt="">
              <img v-if="item.num >= 4" src="/static/images/f.png" alt="">
              <img v-else src="/static/images/e.png" alt="">
              <img v-if="item.num >= 5" src="/static/images/f.png" alt="">
              <img v-else src="/static/images/e.png" alt="">
              <span>{{ item.rating.average }}</span>
            </view>
            <view v-else class="score">
              暂无评分
            </view>
          </view>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
// 导入自己封装的 wx.request 方法
import myrequest from '../../utils/myrequest.js'

export default {
  data() {
    return {
      intheatersList: [],
      top250: []
    }
  },
  methods: {
    // 语法糖：
    async getintheatersList() {
      // -------------------- 3.0 使用 async & await 来改造代码
      // 目标：将异步代码以同步的方式进行书写
      var res = await myrequest({
        url: 'https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a',
        header: {
          'content-type': 'json'
        }
      })
      console.log('------------------------------------------------')
      // 赋值
      this.intheatersList = res.data.subjects
      // 在每条数据中动态添加一个属性：星星的个数
      this.intheatersList.forEach(item => {
        // 得到分数
        let score = item.rating.average
        // 计算星星个数：Math.ceil(分数 / 2)
        let num = Math.ceil(score / 2)
        // 将星星个数赋值给对象
        item.num = num
      })
      console.log(res)
      console.log('------------------------------------------------')
      // ------------------ 2.0 使用 promsie 封装 wx.request 来发送请求
      // 使用自己封装的代码来发送请求
      // myrequest({
      //   url: 'https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a',
      //   header: {
      //     'content-type': 'json'
      //   }
      // }).then(res => {
      //   this.intheatersList = res.data.subjects
      // })
      // ------------------1.0 使用 原生的 wx.request 来发送请求
      // 动态请求正在热映的数据
      // wx.request({
      //   url: 'https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a',
      //   method: 'GET',
      //   data: {},
      //   header: {
      //     'content-type': 'json'
      //   },
      //   success: res => {
      //     // 得到数据
      //     this.intheatersList = res.data.subjects
      //   }
      // })
    },
    async gettop250() {
      var res = await myrequest({
        url: 'https://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a',
        header: {
          'content-type': 'json'
        }
      })
      this.top250 = res.data.subjects
      // 动态添加星星数
      this.top250.forEach(item => {
        item.num = Math.ceil(item.rating.average / 2)
      })
    }
  },
  // 当页面打开调用方法
  mounted() {
    // 获取存在热映
    this.getintheatersList()
    // 获取  top250
    this.gettop250()
  }
}
</script>

<style>
.top {
  height: 94rpx;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  padding: 0 36rpx;
  justify-content: space-between;
  align-items: center;
}

.top .left {
  font-size: 20px;
  font-weight: 700;
  font-family: '微软雅黑';
  color: #00b600;
  display: flex;
  align-items: center;
}

.top .left span {
  margin-right: 20rpx;
}

.top .right button {
  width: 200rpx;
  height: 58rpx;
  background-color: #42bd56;
  font-size: 12px;
  color: #fff;
}


.content .title {
  padding: 0 36rpx;
  width: 100%;
  height: 98rpx;
  line-height: 98rpx;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}

.content .title span {
  font-size: 16px;
}

.content .title navigator {
  font-size: 14px;
  color: #42bd56;
}

.content .list {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}

.scroll-view-item_H {
  width: 200rpx;
  margin-right: 16rpx;
  display: inline-block;
}

.scroll-view-item_H:first-child {
  margin-left: 36rpx;
}

.scroll-view-item_H:last-child {
  margin-right: 36rpx;
}

.content .list .myitem .img {
  width: 200rpx;
  height: 286rpx;
}

.content .list .myitem .name {
  font-size: 14px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.content .list .myitem .score {
  font-size: 12px;
  text-align: center;
  line-height: 26px;
}

.content .list .myitem .score img {
  width: 25rpx;
  height: 25rpx;
}

.content .list .myitem .score span {
  margin-left: 10rpx;
}
</style>
