<template>
  <div class="box">
    <view class="item" v-for="(item, index) in dataList" :key="index">
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
  </div>
</template>

<script>
// 导入 myrequest 
import myrequest from '../../utils/myrequest'

export default {
  data() {
    return {
      // 请求路径相同的部分
      baseUrl: 'https://api.douban.com/v2/movie/',
      // 不同的部分
      url: '',
      // 数据源
      dataList: []
    }
  },
  onLoad(options) {
    // console.log(options)
    // 接收参数
    let type = options.type
    // 根据参数设置当前页面的标题  
    if (type === 'intheater') {
      // 给 url 赋值
      this.url = 'in_theaters'
      wx.setNavigationBarTitle({
        title: '正在热映'
      })
    } else {
      this.url = 'top250'
      wx.setNavigationBarTitle({
        title: 'top250'
      })
    }
    // 调用方法得到数据
    this.getList()
  },
  methods: {
    // 请求数据
    async getList() {
      let res = await myrequest({
        url: `${this.baseUrl}${this.url}?apikey=0df993c66c0c636e29ecbb5344252a4a`,
        header: {
          'content-type': 'json'
        }
      })
      // 将数据源进行赋值
      this.dataList = res.data.subjects
      // 给数据添加星星
      this.dataList.forEach(item => {
        item.num = Math.ceil(item.rating.average / 2)
      })
    }
  }
}
</script>

<style>
.box {
  display: flex;
  flex-wrap: wrap;
}

.box .item {
  width: 33.33%;
  text-align: center;
}

.box .item .img {
  width: 180rpx;
  height: 260rpx;
}

.box .item .name {
  font-size: 14px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.box .item .score {
  font-size: 12px;
  text-align: center;
  line-height: 26px;
}

.box .item .score img {
  width: 25rpx;
  height: 25rpx;
}

.box .item .score span {
  margin-left: 10rpx;
}
</style>
